const { createClient } = supabase

const supabaseUrl = "https://aurvwenhxhrivrdwlmwt.supabase.co"
const supabaseKey = "sb_publishable_ZUjhjBk4Pe4DYNqQnr5mjQ_Y5r_UrME"

const db = createClient(supabaseUrl, supabaseKey)

document.getElementById("loginForm").addEventListener("submit", async function(e){

e.preventDefault()

const email = document.getElementById("email").value
const password = document.getElementById("password").value

const { data, error } = await db.auth.signInWithPassword({
email: email,
password: password
})

if(error){
alert(error.message)
return
}

alert("Login successful")

window.location.href = "index.html"

})