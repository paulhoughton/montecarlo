Random.self_init();;

let calcValues investment avg vol years repeat callback =  
  let rec total running count =
  if count = 0 then running
  else let v = Ierfc.ppf avg vol (Random.float 1.) in
    total (running *. (1.+.v)) (count-1) in
  let rec repeatTotal running minV maxV count =
    if count = 0 then running, minV, maxV
    else let v = total investment years in 
      let minV = min v minV in
      let maxV = max v maxV in
      if count mod (repeat / 100) = 0 then callback(101-(count*100)/repeat);
      repeatTotal (running +. v) minV maxV (count - 1) in
        repeatTotal 0. infinity 0. repeat;;  