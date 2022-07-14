use crate::Coordinates;

pub struct Map {
    size: u8,
    obstacles: Vec<Coordinates>,
}

impl Map {
    pub fn new(size: u8) -> Self {
        Self {
            obstacles: vec![],
            size,
        }
    }

    pub fn size(&self) -> u8 {
        self.size
    }

    pub fn add_obstacle(&mut self, coordinates: Coordinates) {
        self.obstacles.push(coordinates);
    }

    pub(crate) fn has_obstacle(&self, coordinates: Coordinates) -> bool {
        self.obstacles.iter().any(|&x| x == coordinates)
    }
}
