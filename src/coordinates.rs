#[derive(Debug, Default, Clone, Copy, PartialEq, Eq)]
pub struct Coordinates {
    x: u8,
    y: u8,
}

impl Coordinates {
    pub fn origin() -> Self {
        Self { x: 0, y: 0 }
    }

    pub fn new(x: u8, y: u8) -> Self {
        Self { x, y }
    }

    pub fn x(&self) -> u8 {
        self.x
    }

    pub fn y(&self) -> u8 {
        self.y
    }
}
