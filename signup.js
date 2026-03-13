const { createClient } = supabase

const supabaseUrl = "https://aurvwenhxhrivrdwlmwt.supabase.co"
const supabaseKey = "sb_publishable_ZUjhjBk4Pe4DYNqQnr5mjQ_Y5r_UrME"

const db = createClient(supabaseUrl, supabaseKey)

document.getElementById("signupForm").addEventListener("submit", async function(e){

e.preventDefault()

const email = document.getElementById("email").value
const password = document.getElementById("password").value

const { data, error } = await db.auth.signUp({
email: email,
password: password
})

if(error){
alert(error.message)
return
}

alert("Account created. Please login.")

window.location.href = "login.html"

})