(* Complementary error function *)
let erfc x =
    let z = abs_float x in
    let t = 1. /. (1. +. z /. 2.) in
    let r = t *. exp(-.z *. z -. 1.26551223 +. t *. (1.00002368 +.
        t *. (0.37409196 +. t *. (0.09678418 +. t *. (-.0.18628806 +.
        t *. (0.27886807 +. t *. (-.1.13520398 +. t *. (1.48851587 +.
            t *. (-.0.82215223 +. t *. 0.17087277))))))))) in
    if x >= 0. then r else 2. -. r
    
(* Inverse complementary error function *)
let ierfc x = 
    let xx = if x < 1. then x else 2. -.x in 
    let t = sqrt((-.2.) *. log(xx /. 2.)) in
    let calc xx v = let err = erfc(v) -. xx in v +. err /. (1.12837916709551257 *. exp(-.(v *. v)) -. v *. err) in
    let v = (-.0.70711 *. ((2.30753 +. t *. 0.27061) /. (1. +. t *. (0.99229 +. t *. 0.04481)) -. t)) in
    let v2 = calc xx in
    let v3 = v2 (v2 v) in
    if (x < 1.) then v3 else -.(v3)

(* Percent point function *)
let ppf mean var x = mean -. sqrt(var) *. sqrt(2.) *. ierfc(2. *. x)

