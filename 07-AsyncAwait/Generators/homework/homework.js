function* fizzBuzzGenerator(max) {
  // Tu código acá:
  
  num=1
  while(num<=max||!max){
    if(num%3===0&&num%5===0){
      yield "Fizz Buzz"
    }else{
      if(num%3===0) yield "Fizz"
      else{
        if(num%5===0) yield "Buzz"
        else yield num
      }
    }
    num=num+1
  }
}

module.exports = fizzBuzzGenerator;
