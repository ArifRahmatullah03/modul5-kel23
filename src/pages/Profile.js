import React, { useState, useEffect } from "react";

function Profile() {
  // State untuk menyimpan data anggota kelompok
  const [users, setUsers] = useState([
    {
      name: "Nadia Faadhillah",
      username: "nadiaafdlh", // Pastikan username GitHub tepat
      githubProfile: "https://github.com/nadiaafdlh",
      avatarUrl: "https://github.com/nadiaafdlh.png",
      followers: 0, // Initial followers count
    },
    {
      name: "Shulhan Aziz",
      username: "Shulhan23",
      githubProfile: "https://github.com/Shulhan23",
      avatarUrl: "https://github.com/Shulhan23.png",
      followers: 0, // Initial followers count
    },
    {
      name: "Rizal Agatha Erdin Agesyah",
      username: "rizalagatha",
      githubProfile: "https://github.com/rizalagatha",
      avatarUrl: "https://github.com/rizalagatha.png",
      followers: 0, // Initial followers count
    },
    {
      name: "Arif Rahmatullah",
      username: "ArifRahmatullah03",
      githubProfile: "https://github.com/ArifRahmatullah03",
      avatarUrl: "https://github.com/ArifRahmatullah03.png",
      followers: 0, // Initial followers count
    }
  ]);

  // Function untuk mendapatkan jumlah followers dari GitHub
  const fetchFollowers = async (username) => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();
      if (response.ok) {
        return data.followers; // Mengambil jumlah followers
      } else {
        console.error("Error fetching followers for", username, ":", data.message);
        return 0;
      }
    } catch (error) {
      console.error("Error fetching followers:", error);
      return 0; // Return 0 jika ada error
    }
  };

  // Menggunakan useEffect untuk mengambil data followers
  useEffect(() => {
    const getFollowers = async () => {
      const updatedUsers = await Promise.all(
        users.map(async (user) => {
          const followers = await fetchFollowers(user.username);
          return { ...user, followers }; // Update followers count
        })
      );
      setUsers(updatedUsers); // Update state dengan data baru
    };

    getFollowers(); // Panggil function untuk mengambil data
  }, []); // Kosongkan dependency array agar hanya dijalankan sekali

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh", flexWrap: "wrap" }}>
      {users.map((user, index) => (
        <div
          key={index}
          style={{
            backgroundColor: "#2c2f33",
            borderRadius: "10px",
            padding: "20px",
            textAlign: "center",
            color: "white",
            width: "400px",
            margin: "10px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)", // Added shadow for better visual
          }}
        >
          <img 
            src={user.avatarUrl} 
            alt={`${user.username}'s avatar`} // Improved alt text for accessibility
            style={{ borderRadius: "50%", width: "100px", height: "100px", objectFit: "cover", marginBottom: "15px" }}
          />
          <h3>Name: {user.name}</h3>
          <p>Followers: {user.followers}</p>
          <a 
            href={user.githubProfile} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: "#7289da", textDecoration: "none", fontWeight: "bold" }}
          >
            GitHub Profile
          </a>
        </div>
      ))}
    </div>
  );
}

export default Profile;
