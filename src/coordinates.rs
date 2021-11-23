#[derive(Debug, Default, Clone, Copy, PartialEq, Eq)]
pub struct Coordinates {
    pub x: u8,
    pub y: u8,
}

impl Coordinates {
    pub fn origin() -> Self {
        Self { x: 0, y: 0 }
    }
}
