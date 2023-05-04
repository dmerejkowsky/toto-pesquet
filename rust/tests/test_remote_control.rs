use rover::{Coordinates, Map, Rover};

const MAP_SIZE: u8 = 10;

macro_rules! command_tests {
    ($($name:ident: $command:expr => $expected:expr,)*) => {
    $(
        #[test]
        fn $name() {
            let map = Map::new(MAP_SIZE);
            let coordinates = Coordinates::origin();
            let mut rover = Rover::new(coordinates, map);
            let ok = rover.execute($command);
            assert!(ok);
            assert_eq!(rover.describe_position(), $expected);
        }
    )*
    }
}

fn move_of(n: u32) -> String {
    let mut res = String::new();
    for _ in 0..n {
        res.push('F')
    }
    res
}

command_tests! {
    one_right:    "R"    => "0:0:E",
    two_rights:   "RR"   => "0:0:S",
    three_rights: "RRR"  => "0:0:W",
    four_rights:  "RRRR" => "0:0:N",

    one_left:     "L"    => "0:0:W",
    two_lefts:    "LL"   => "0:0:S",
    three_lefts:  "LLL"  => "0:0:E",
    four_lefts:   "LLLL" => "0:0:N",

    up:           "F"    => "0:1:N",
    three_ups:    "FFF"  => "0:3:N",

    to_the_right: "RF"   => "1:0:E",

    wrap1: &move_of(11) => "0:0:N",
    wrap2: "RRF" => "0:10:S",
    wrap3: "LF" => "10:0:W",
    wrap4: "RFFFFFFFFFFF" => "0:0:E",
    wrap5: &move_of(100000) => "0:10:N",
}

#[test]
fn can_get_stuck_if_obstacle_in_map() {
    let mut map = Map::new(MAP_SIZE);
    map.add_obstacle(Coordinates::new(0, 3));

    let mut rover = Rover::new(Coordinates::origin(), map);

    let ok = rover.execute("FFF");
    assert!(!ok);
    assert_eq!(rover.describe_position(), "0:2:N");
}
