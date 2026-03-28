var input = document.getElementById('username');
var btn = document.getElementById('btn');
var display = document.getElementById('result');

btn.addEventListener('click', function () {

    var user = input.value.trim();

    if (user === "") {
        alert("Please enter a username!");
        return;
    } 
// Loading state
    display.innerHTML = "<p>Loading profile...</p>";

    fetch("https://api.github.com/users/" + user)
        .then(function (response) {
            return response.json().then(function (data) {
                return { status: response.status, data: data };
            });
        })
        .then(function (res) {

            // ❌ User not found
            if (res.status === 404) {
                display.innerHTML = "<p class='error-msg'>User not found. Try again.</p>";
                return;
            }

            // ❌ API limit / other errors
            if (res.status !== 200) {
                display.innerHTML = `<p class='error-msg'>${res.data.message}</p>`;
                return;
            }

            // ✅ Success
            var data = res.data;

            var profileHtml = `
            <div class="user-details">
                <img src="${data.avatar_url}" alt="Img" class="avatar">
                <div class="name">${data.name || user}</div>
                <div class="user-handle">@${data.login}</div>
                <div class="bio">${data.bio || "No bio available"}</div>

                <div class="stats">
                    <div class="one-stat">
                        <span class="val">${data.public_repos}</span>
                        <span class="label">Repos</span>
                    </div>
                    <div class="one-stat">
                        <span class="val">${data.followers}</span>
                        <span class="label">Followers</span>
                    </div>
                    <div class="one-stat">
                        <span class="val">${data.following}</span>
                        <span class="label">Following</span>
                    </div>
                </div>

                <a href="${data.html_url}" target="_blank" class="link-btn">View Profile</a>
            </div>
            `;

            display.innerHTML = profileHtml;
        })
        .catch(function (error) {
            console.error(error);
            display.innerHTML = "<p class='error-msg'>Network error. Please check your internet.</p>";
        });
});


// 🔥 BONUS: Press Enter to search
input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        btn.click();
    }
});

