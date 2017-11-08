let rec fact = (n) => n <= 0 ? 1 : n * fact(n - 1);

let sub = (x, y) => x - y;

fact(4) |> sub(fact(5)) |> Js.log;
