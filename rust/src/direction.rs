#[derive(Debug, Clone, Copy)]
pub enum Direction {
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

use std::fmt::Display;

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
