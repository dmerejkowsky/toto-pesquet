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

impl Direction {
    pub fn left(self) -> Self {
        match self {
            North => West,
            South => East,
            East => North,
            West => South,
        }
    }

    pub fn right(self) -> Self {
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

#[derive(Debug, Default, Clone, Copy)]
struct Coordinates {
    x: u8,
    y: u8,
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
}

#[derive(Default)]
pub struct Rover {
    direction: Direction,
    coordinates: Coordinates,
}

impl Rover {
    pub fn new() -> Self {
        Default::default()
    }

    pub fn execute(&mut self, command: &str) -> String {
        for c in command.chars() {
            match c {
                'R' => {
                    self.direction = self.direction.right();
                }
                'L' => {
                    self.direction = self.direction.left();
                }
                'M' => {
                    self.coordinates.move_to(self.direction);
                }
                _ => todo!(),
            }
        }

        format!(
            "{}:{}:{}",
            self.coordinates.x, self.coordinates.y, self.direction
        )
    }
}

#[cfg(test)]
mod tests;
