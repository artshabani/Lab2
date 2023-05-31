import React from "react";

function Footer() {

    return (
        <footer style={{ backgroundColor: 'black', color: 'white', padding: '20px', textAlign: 'center' }}>
            <p>Address: 123 Main St, Prishtina, Kosovo</p>
            <p>Email: ideaaxhafa@gmail.com</p>
            <p>Phone: 045159999</p>
            <div>
                <a href="https://github.com" style={{ color: 'white', marginRight: '10px' }}>GitHub</a>
                <a href="https://trello.com" style={{ color: 'white', marginRight: '10px' }}>Trello</a>
            </div>
            <p>© 2023 Your Company. All rights reserved.</p>
        </footer>
    )
}
export default Footer;