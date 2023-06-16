import { Link, useRouteError } from "react-router-dom";
import classes from "./ErrorPage.module.css";
import Card from "../components/UI/Card";

const ErrorPage = () => {
	const error = useRouteError();

	return (
		<section className={classes.error_page}>
			<div className={classes.error}>
				<Card>
					<div className={classes.card_content}>
						<div className={classes.message}>
							<p className={classes.template}>
								Uh oh, you seem to have drifted off of your path
							</p>
							<em>
								<b>Error:</b>{" "}
								{error?.message || error?.error.message}
							</em>
						</div>
						<Link to={"/"}>
							<button className={classes.return_btn}>
								Go Home
							</button>
						</Link>
					</div>
				</Card>
			</div>
		</section>
	);
};

export default ErrorPage;
