<script>
	import { first_name, last_name, name } from '$lib/constants.js'
	import { contact_info, education, open_source, professional, skills } from '$lib/resume.js'
</script>

<svelte:head>
	{@html `
		<script type="application/ld+json">
			{
				"@context": "https://schema.org",
				"@type": "ProfilePage",
				"mainEntity": {
					"@type": "Person",
					"name": "${name}",
					"description": "Jack of all trades. Master of some."
				},
			}
		</script>
	`}
</svelte:head>

<header>
	<h1>
		<span class="first-name">{first_name}</span>
		<span class="last-name">{last_name}</span>
	</h1>

	<section id="contact-info">
		<a href={contact_info.website.link} target="_blank">{contact_info.website.name}</a>

		<h3>
			<a
				class="telephone"
				href="tel:{contact_info.telephone.area_code}-{contact_info.telephone.prefix}-{contact_info
					.telephone.line_number}"
			>
				<span class="country-code">{contact_info.telephone.country_code}</span>
				<span class="area-code">{contact_info.telephone.area_code}</span>
				<span class="prefix">{contact_info.telephone.prefix}</span>
				<span class="line-number">{contact_info.telephone.line_number}</span>
			</a>
		</h3>
	</section>
</header>

<aside>
	<h1>Education</h1>

	{#each education as school}
		<article id="education">
			<h2>{school.name}</h2>
			<h3>{school.college}</h3>
			<h5>
				<span class="dashed">{school.dates.end}</span>
				<span class="dashed">{school.location.city}, {school.location.state}</span>
			</h5>
			{#each school.degrees as degree}
				<h4>{degree}</h4>
			{/each}
		</article>
	{/each}
</aside>

<article id="professional">
	<h1>Professional Experience</h1>

	{#each professional as workplace}
		<section class="workplace">
			<h2 class="workplace-name piped">{workplace.company}</h2>
			<h3 class="title piped">{workplace.position}</h3>
			<h4>
				<span class="start-date dashed">{workplace.start_date}</span>
				<span class="end-date dashed piped">{workplace.end_date}</span>
				<span class="location piped">{workplace.location}</span>
				<span class="site">{workplace.site}</span>
			</h4>
			<ul>
				{#each workplace.points as point}
					<li>{@html point}</li>
				{/each}
			</ul>
		</section>
	{/each}
</article>

<article id="open-source">
	<h1>Open Source Contributions</h1>

	{#each open_source as os}
		<section class="organization">
			<h2 class="organization-name">{os.name}</h2>

			{#each os.contributions as contribution}
				<h3 class="title">
					{#each contribution.projects as project}
						<a href={project.link} target="_blank" rel="noopener noreferrer">
							<span>{project.name}</span>
						</a>
						<span>/</span>
					{/each}
				</h3>

				<ul>
					{#each contribution.points as point}
						<li>{@html point}</li>
					{/each}
				</ul>
			{/each}
		</section>
	{/each}
</article>

<article id="skills">
	<h1>Technical Skills</h1>

	{#each skills as skill}
		<h2>{skill.name}</h2>
		{#each skill.items as item}
			<span class="dotted">{item}</span>
		{/each}
	{/each}
</article>

<style>
	h1 {
		font-size: x-large !important;
		font-weight: 500;
		margin: 12px 0;
	}

	h2 {
		font-size: larger;
		margin: 8px 0;
	}

	h3 {
		font-size: large;
		margin: 6px 0;
	}

	.dotted + .dotted::before {
		font-weight: normal;
		font-style: normal;
		content: ' · ';
	}

	.piped + .piped::before {
		font-weight: normal;
		font-style: normal;
		content: ' | ';
	}

	.dashed + .dashed::before {
		font-weight: normal;
		font-style: normal;
		content: ' - ';
	}

	header {
		.first-name {
			font-weight: 200;
		}

		.last-name {
			font-weight: 700;
		}

		#contact-info {
			text-align: center;

			a {
				color: unset;
				font-weight: normal;
			}

			.telephone {
				font-size: 0;

				span {
					font-size: large;
				}

				.country-code::before {
					content: '+';
				}

				.country-code::after {
					content: ' ';
				}

				.area-code::before {
					content: '(';
				}

				.area-code::after {
					content: ') ';
				}

				.prefix {
					margin: 0 4px 0 0;
				}

				.line-number::before {
					content: '- ';
				}
			}
		}

		h1 {
			cursor: pointer;
		}

		h1 > span {
			font-size: 36px;
		}
	}

	h1 {
		text-align: center;
	}

	h2 {
		font-weight: normal;
		text-decoration: underline;
	}

	h4,
	h5 {
		font-weight: normal;
	}

	h5 {
		font-style: italic;
	}

	#education,
	#skills {
		text-align: center;
	}

	#professional {
		line-height: 1.6;

		h4 {
			font-weight: normal;
			text-align: center;
			margin: 1% 0;
		}

		.workplace-name,
		.title {
			display: inline;
		}

		.location {
			font-style: italic;
		}

		.site::before {
			content: '(';
		}

		.site::after {
			content: ')';
		}

		.workplace {
			margin: 2% 2% 2% 6%;
		}
	}

	#open-source {
		line-height: 1.6;

		.organization {
			margin: 2% 2% 2% 6%;
		}
	}
</style>
