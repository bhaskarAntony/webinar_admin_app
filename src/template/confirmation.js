const UserEmail = (name) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
            *{
                padding: 0;
                margin: 0;
                box-sizing: border-box;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }
            .header{
                background-color: blue;
                color: #fff;
                text-align: center;
                padding: 20px;
            }
            .logo{
                width: 200px;
            }
            button{
                border: 0;
                padding: 10px 20px;
                border-radius: 10px;
                font-size:1.2rem;
                background-color: #e4f52d;
            }
            .body{
                padding: 20px;
                margin-bottom: 20px;
            }
            .attenction{
                background-color: #4400e3;
                padding: 20px;
                color: #fff;
                text-align: center;
            }
            ul{
                padding: 20px;
            }
            ul li{
                margin-bottom: 10px;
                font-size: 1.1em;
            }
        </style>
    </head>
    <body>
        <div class="header">
            <img src="https://res.cloudinary.com/dfogisedz/image/upload/v1696400519/webinar/wuxjubwtp8csymfqv28t.png" alt="" class="logo">
            <h1>Thanks for Registering Data Science webinar</h1>
            <p>Saturday,  28th October 2023 @ 10:30 am to 1:30 pm and 2:30 pm to 5:30 pm IST</p>
            <div style="padding:20px; text-align:center">
              <h3><b>Presenter:- </b> K.P Asha Rani</h3>
              <h4>Assistance Professor at Dr. Ambedkar Institute Of Technology</h4>
            </div>
            
        </div>
        <div class="body" style="padding: 50px 10px;">
            <h2 style="margin-bottom: 20px;">Here is What you will Learn over 3 Hours</h2>
           <ul>
            <li>Blue print for High-paid data Science Career.</li>
            <li>Live Q&A Session With Experts.</li>
            <li>Get Data Science Career Industry Demands.</li>
            <li>Get E-certificate and Study Material.</li>
            </ul>
        </div>
        <div>
            <h3>We Are Excited To See You Live</h3>
    
    
           
            <div style="background-color: #000; padding: 10px;">
               <p style=""> <b>Note: </b> Webinar Link Will be Shared soon...</p>
            </div>
        </div>
        <div class="attenction">
            <p style="margin-bottom: 20px;"><b>Attenction:</b> Those Who are not completed Payment, they are not eligible to attend this data science webinar. so Just Pay RS 199/- Here To Secure Your Spot.</p>
    
            <div>
            <a href="https://razorpay.me/@bepracticaltechsolutions?amount=KxK8ikz%2BGFZ8lMDydVeeuA%3D%3D" style="text-decoration: none;"><button class="call" style="background-color: #red;">Pay Here</button></a>
            </div>
            <div style="text-align: center; color: #fff; margin-top: 20px;">Please Ignore If you Already paid.</div>
        </div>
        <footer style="background-color: #0c0110; padding:20px;">
            <div style=" text-align:center">
                <a href="tel:+919242079119" style="text-decoration: none;"><button class="call" style="background-color: #00f857;">Call us for more info</button></a> 
            </div>
        </footer>
    </body>
    </html>
    `;
  };
  
  module.exports = UserEmail;
  