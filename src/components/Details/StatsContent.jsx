import classes from "./StatsContent.module.css";

const StatsContent = ({ stats }) => {
	return (
		<div className={classes.stats}>
			{stats &&
				stats.map((stat, idx) => (
					<div key={idx} className={classes.stat}>
						<div className={classes.stat__name}>
							<span>{stat.stat.name}</span>
						</div>

						<div className={classes.stat__value}>
							<span>{stat.base_stat}</span>
							<div className={classes.bar}>
								<div
									className={classes.val}
									style={{ width: `${stat.base_stat}%` }}
								></div>
							</div>
						</div>
					</div>
				))}
		</div>
	);
};

export default StatsContent;
