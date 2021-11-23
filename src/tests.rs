use super::*;

macro_rules! command_tests {
    ($($name:ident: $command:expr => $expected:expr,)*) => {
    $(
        #[test]
        fn $name() {
            let mut rover = Rover::new();
            let actual = rover.execute($command);
            assert_eq!(actual, $expected);
        }
    )*
    }
}

fn move_of(n: u32) -> String {
    let mut res = String::new();
    for _ in 0..n {
        res.push('M')
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

    up:           "M"    => "0:1:N",
    three_ups:    "MMM"  => "0:3:N",

    to_the_right: "RM"   => "1:0:E",

    wrap1: "MMMMMMMMMMM" => "0:0:N",
    wrap2: "RRM" => "0:10:S",
    wrap3: "LM" => "10:0:W",
    wrap4: "RMMMMMMMMMMM" => "0:0:E",
    wrap5: &move_of(100000) => "0:10:N",
}
