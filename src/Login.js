export default function Login() {
    return ( 

<div class="container" id="container">


	<div class="form-container sign-in-container">
		<form action="#">
			<h1> 
				<a href="https://anycompany-demo.auth.us-east-1.amazoncognito.com/login?client_id=3jciebreg6vlr299e0phrb451j&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https://ec2-52-44-207-160.compute-1.amazonaws.com:3000/home">Log In</a>
            </h1>
        </form>
	</div>
	<div class="overlay-container">
		<div class="overlay">
			<div class="overlay-panel overlay-left">
				
				<p>Welcome! To keep connected with us please login with your personal info</p>
				{/* <button class="ghost" id="signIn">Sign In</button> */}
			</div>
			{/* <div class="overlay-panel overlay-right">
				<h1>Hello, Friend!</h1>
				<p>Enter your personal details and start journey with us</p>
			</div> */}
		</div>
	</div>
</div>

        
    );
}
