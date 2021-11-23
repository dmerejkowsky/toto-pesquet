use crate::Coordinates;
use crate::Direction;
use crate::Direction::*;
use crate::Map;

impl Coordinates {
    fn translate(coordinates: Coordinates, direction: Direction) -> Coordinates {
        match direction {
            North => Coordinates {
                x: coordinates.x,
                y: add_one_and_clip(coordinates.y, 10),
            },
            South => Coordinates {
                x: coordinates.x,
                y: sub_one_and_clip(coordinates.y, 10),
            },
            East => Coordinates {
                x: add_one_and_clip(coordinates.x, 10),
                y: coordinates.y,
            },
            West => Coordinates {
                x: sub_one_and_clip(coordinates.x, 10),
                y: coordinates.y,
            },
        }
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

pub struct Rover {
    direction: Direction,
    coordinates: Coordinates,
    map: Map,
}

impl Rover {
    pub fn new(coordinates: Coordinates, map: Map) -> Self {
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
                    let new_coordinates = Coordinates::translate(self.coordinates, self.direction);
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

    pub fn describe_position(&self) -> String {
        format!(
            "{}:{}:{}",
            self.coordinates.x, self.coordinates.y, self.direction
        )
    }
}
