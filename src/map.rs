use crate::Coordinates;

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
