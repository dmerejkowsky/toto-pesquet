use crate::Coordinates;
use crate::Direction;
use crate::Direction::*;
use crate::Map;

fn translate(map: &Map, coordinates: Coordinates, direction: Direction) -> Coordinates {
    let max = map.size();
    let x = coordinates.x();
    let y = coordinates.y();
    match direction {
        North => Coordinates::new(x, add_one_and_clip(y, max)),
        South => Coordinates::new(x, sub_one_and_clip(y, max)),
        East => Coordinates::new(add_one_and_clip(x, max), y),
        West => Coordinates::new(sub_one_and_clip(x, max), y),
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
                    let new_coordinates = translate(&self.map, self.coordinates, self.direction);
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
            self.coordinates.x(),
            self.coordinates.y(),
            self.direction
        )
    }
}
