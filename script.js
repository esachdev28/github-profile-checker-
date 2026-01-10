var input = document.getElementById('username');
var btn = document.getElementById('btn');
var display = document.getElementById('result');

btn.addEventListener('click', function () {

    var user = input.value;

    if (user === "") {
        alert("Please enter a username!");
        return;
    }

    // showing loading...
    display.innerHTML = "<p>Loading profile...</p>";

    fetch("https://api.github.com/users/" + user)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("User not found");
            }
        })
        .then(function (data) {

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
            display.innerHTML = "<p class='error-msg'>User not found. Try again.</p>";
        });
});
