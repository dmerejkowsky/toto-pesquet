#![allow(dead_code)]
use std::fmt::Display;

#[derive(Debug, Clone, Copy)]
enum Direction {
    North,
    South,
    East,
    West,
}

impl Default for Direction {
    fn default() -> Self {
        North
    }
}

use Direction::*;

pub struct Map {
    obstacles: Vec<Coordinates>,
}

impl Map {
    pub fn new() -> Self {
        Self { obstacles: vec![] }
    }

    pub fn add_obstacle(&mut self, coordinates: Coordinates) {
        self.obstacles.push(coordinates);
    }

    pub(crate) fn has_obstacle(&self, coordinates: Coordinates) -> bool {
        self.obstacles.iter().find(|&&x| x == coordinates).is_some()
    }
}

impl Direction {
    fn left(self) -> Self {
        match self {
            North => West,
            South => East,
            East => North,
            West => South,
        }
    }

    fn right(self) -> Self {
        match self {
            North => East,
            South => West,
            East => South,
            West => North,
        }
    }
}

impl Display for Direction {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            North => write!(f, "N"),
            South => write!(f, "S"),
            East => write!(f, "E"),
            West => write!(f, "W"),
        }
    }
}

#[derive(Debug, Default, Clone, Copy, PartialEq, Eq)]
pub struct Coordinates {
    x: u8,
    y: u8,
}

impl Coordinates {
    fn origin() -> Self {
        Self { x: 0, y: 0 }
    }
}

fn add_one_and_clip(x: u8, max: u8) -> u8 {
    if x == max {
        0
    } else {
        x + 1
    }
}

fn sub_one_and_clip(x: u8, max: u8) -> u8 {
    if x == 0 {
        max
    } else {
        x - 1
    }
}

impl Coordinates {
    fn move_to(&mut self, direction: Direction) {
        match direction {
            North => self.y = add_one_and_clip(self.y, 10),
            South => self.y = sub_one_and_clip(self.y, 10),
            East => self.x = add_one_and_clip(self.x, 10),
            West => self.x = sub_one_and_clip(self.x, 10),
        }
    }

    fn moved_to(&self, direction: Direction) -> Coordinates {
        match direction {
            North => Coordinates {
                x: self.x,
                y: add_one_and_clip(self.y, 10),
            },
            South => Coordinates {
                x: self.x,
                y: sub_one_and_clip(self.y, 10),
            },
            East => Coordinates {
                x: add_one_and_clip(self.x, 10),
                y: self.y,
            },
            West => Coordinates {
                x: sub_one_and_clip(self.x, 10),
                y: self.y,
            },
        }
    }
}

pub struct Rover {
    direction: Direction,
    coordinates: Coordinates,
    map: Map,
}

impl Rover {
    fn new(coordinates: Coordinates, map: Map) -> Self {
        Self {
            direction: North,
            coordinates,
            map,
        }
    }

    pub fn execute(&mut self, command: &str) -> bool {
        for c in command.chars() {
            match c {
                'R' => {
                    self.direction = self.direction.right();
                }
                'L' => {
                    self.direction = self.direction.left();
                }
                'F' => {
                    let new_coordinates = self.coordinates.moved_to(self.direction);
                    if self.map.has_obstacle(new_coordinates) {
                        return false;
                    } else {
                        self.coordinates = new_coordinates;
                    }
                }
                c => panic!("Invalid char '{}' in command string", c),
            }
        }

        true
    }

    pub fn status(&self) -> String {
        format!(
            "{}:{}:{}",
            self.coordinates.x, self.coordinates.y, self.direction
        )
    }
}

#[cfg(test)]
mod tests;
