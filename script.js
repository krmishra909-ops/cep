const { createClient } = supabase

const supabaseUrl = "https://aurvwenhxhrivrdwlmwt.supabase.co"
const supabaseKey = "sb_publishable_ZUjhjBk4Pe4DYNqQnr5mjQ_Y5r_UrME"

const db = createClient(supabaseUrl, supabaseKey)

document.addEventListener("DOMContentLoaded", async () => {

  // Check login session
  const { data } = await db.auth.getSession()

  if(!data.session){
    window.location.href = "login.html"
    return
  }

  // FORM SUBMIT
  document.getElementById("fitnessForm").addEventListener("submit", async function(e){

    e.preventDefault()

    const name = document.getElementById("name").value
    const age = Number(document.getElementById("age").value)
    const height = Number(document.getElementById("height").value)
    const weight = Number(document.getElementById("weight").value)
    const gender = document.getElementById("gender").value
    const goal = document.getElementById("goal").value
    const diet = document.getElementById("diet").value
    const experience = document.getElementById("experience").value
    const days = Number(document.getElementById("days").value)

    const dataInsert = {name,age,height,weight,gender,goal,diet,experience,days}

    const { error } = await db
      .from("users")
      .insert([dataInsert])

    if(error){
      alert(error.message)
      return
    }

    const bmi = weight / ((height/100)*(height/100))

    let category

    if(bmi < 18.5){
      category = "Underweight"
    }
    else if(bmi < 25){
      category = "Normal"
    }
    else if(bmi < 30){
      category = "Overweight"
    }
    else{
      category = "Obese"
    }

    let calories = weight * 33

    if(goal === "Muscle Gain"){
      calories += 300
    }
    else if(goal === "Fat Loss"){
      calories -= 300
    }

    let workout = ""

    if(days === 3){
      workout = `
      Day 1 – Chest + Triceps<br>
      Day 2 – Back + Biceps<br>
      Day 3 – Legs + Shoulders`
    }

    if(days === 4){
      workout = `
      Day 1 – Chest<br>
      Day 2 – Back<br>
      Day 3 – Legs<br>
      Day 4 – Shoulders`
    }

    if(days === 5){
      workout = `
      Day 1 – Chest<br>
      Day 2 – Back<br>
      Day 3 – Legs<br>
      Day 4 – Shoulders<br>
      Day 5 – Arms`
    }

    if(days === 6){
      workout = `
      Day 1 – Chest<br>
      Day 2 – Back<br>
      Day 3 – Legs<br>
      Day 4 – Shoulders<br>
      Day 5 – Arms<br>
      Day 6 – Cardio`
    }

    let dietPlan = ""

    if(diet === "Vegetarian"){
      dietPlan = `
      Breakfast – Oats + Milk + Banana<br>
      Lunch – Rice + Dal + Paneer<br>
      Snack – Peanut Butter Sandwich<br>
      Dinner – Chapati + Vegetables`
    }

    if(diet === "Non-Vegetarian"){
      dietPlan = `
      Breakfast – Eggs + Toast<br>
      Lunch – Rice + Chicken<br>
      Snack – Peanut Butter Sandwich<br>
      Dinner – Chapati + Chicken`
    }

    if(diet === "Vegan"){
      dietPlan = `
      Breakfast – Oats + Almond Milk<br>
      Lunch – Rice + Beans<br>
      Snack – Nuts + Fruits<br>
      Dinner – Chapati + Vegetables`
    }

    const resultDiv = document.getElementById("result")

    resultDiv.innerHTML = `
    <h2>Your Fitness Plan</h2>

    <p><b>BMI:</b> ${bmi.toFixed(2)} (${category})</p>

    <p><b>Recommended Calories:</b> ${calories} kcal/day</p>

    <h3>Workout Plan</h3>
    <p>${workout}</p>

    <h3>Diet Plan</h3>
    <p>${dietPlan}</p>
    `

    resultDiv.classList.add("visible")

  })


  // LOGOUT BUTTON
  const logoutBtn = document.getElementById("logoutBtn")

  if(logoutBtn){
    logoutBtn.addEventListener("click", async () => {

      const { error } = await db.auth.signOut()

      if(error){
        alert("Logout failed")
        return
      }

      window.location.href = "login.html"

    })
  }

})