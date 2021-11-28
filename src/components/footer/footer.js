import './footer.css';
import facebook_icon from '../../assets/images/facebook_icon.png';
import twitter_icon from '../../assets/images/twitter-icon.png';
import instagram_icon from '../../assets/images/instagram_icon.png';


function Footer() {
	return (
		<div className="homepage-footer" id="homepage-footer">
			<div className="footer2">
				<p className="ff4">Copyright &copy; 2021</p>
				<div className="contactus-footer">
					<p className="ff4">Contact Me</p>
					<p className="ff4">sakshis.ug18.ec@nitp.ac.in</p>
					<p className="ff4">+91000000000</p>
				</div>
				<div className="social-footer">
					<a href="#" ><img src={facebook_icon} className="footer-icon facebook" /></a>
					<a href="#" ><img src={twitter_icon} className="footer-icon twitter" /></a>
					<a href="#"><img src={instagram_icon} className="footer-icon instagram" /></a>
				</div>
			</div>



		</div>
	)
}

export default Footer;