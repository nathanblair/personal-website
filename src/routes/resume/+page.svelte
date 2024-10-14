<script>
	import { first_name, last_name } from '$lib/constants.js'
	import {
		contact_info,
		education,
		open_source,
		professional,
		skills
	} from '$lib/resume.js'
</script>

<header>
	<h1 class="m-4">
		<span class="text-6xl">{first_name}</span>
		<span class="text-6xl font-bold">{last_name}</span>
	</h1>

	<section id="contact-info" class="mb-3 text-center">
		<a href={contact_info.website.link} target="_blank"
			>{contact_info.website.name}</a
		>

		<h3>
			<a
				class="telephone"
				href="tel:{contact_info.telephone.area_code}-{contact_info.telephone
					.prefix}-{contact_info.telephone.line_number}"
			>
				<span class="country-code">{contact_info.telephone.country_code}</span>
				<span class="area-code">{contact_info.telephone.area_code}</span>
				<span class="prefix">{contact_info.telephone.prefix}</span>
				<span class="line-number">{contact_info.telephone.line_number}</span>
			</a>
		</h3>
	</section>
</header>

<aside class="">
	<h1>Education</h1>

	{#each education as school}
		<article
			class="z-5 card m-4 rounded-lg p-2 text-center drop-shadow-md bg-surface-100-900"
		>
			<h2>{school.name}</h2>
			<h3>{school.college}</h3>
			<h5>
				<span class="dashed">{school.dates.end}</span>
				<span class="dashed"
					>{school.location.city}, {school.location.state}</span
				>
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
		<section
			class="z-5 card m-4 rounded-lg p-4 drop-shadow-md bg-surface-100-900"
		>
			<h2 class="piped inline">{workplace.company}</h2>
			<h3 class="piped inline">{workplace.position}</h3>
			<h4>
				<span class="start-date dashed">{workplace.start_date}</span>
				<span class="end-date dashed piped">{workplace.end_date}</span>
				<span class="piped italic">{workplace.location}</span>
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
		<section
			class="z-5 card m-4 rounded-lg p-4 drop-shadow-md bg-surface-100-900"
		>
			<h2 class="organization-name">{os.name}</h2>

			{#each os.contributions as contribution}
				<h3 class="inline">
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

<article id="skills" class="mb-4 text-center">
	<h1>Technical Skills</h1>

	{#each skills as skill}
		<div class="z-5 card m-4 rounded-lg p-4 drop-shadow-md bg-surface-100-900">
			<h2>{skill.name}</h2>
			{#each skill.items as item}
				<span class="dotted">{item}</span>
			{/each}
		</div>
	{/each}
</article>

<style>
	h1 {
		font-size: x-large !important;
		text-align: center;
	}

	h2 {
		font-size: larger;
		font-weight: normal;
		text-decoration: underline;
	}

	h3 {
		font-size: large;
	}

	h4,
	h5 {
		font-weight: normal;
	}

	h5 {
		font-style: italic;
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

	.site::before {
		content: '(';
	}

	.site::after {
		content: ')';
	}

	#professional {
		h4 {
			font-weight: normal;
			text-align: center;
			margin: 1% 0;
		}
	}
</style>
