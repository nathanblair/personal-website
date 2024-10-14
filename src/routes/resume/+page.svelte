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
	<h1 class="m-4 text-center">
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
				<span>+{contact_info.telephone.country_code}</span>
				<span>({contact_info.telephone.area_code})</span>
				<span>{contact_info.telephone.prefix}</span> -
				<span>{contact_info.telephone.line_number}</span>
			</a>
		</h3>
	</section>
</header>

<aside>
	<h1 class="mx-2 text-center text-4xl">Education</h1>

	{#each education as school}
		<article
			class="z-5 card m-4 rounded-lg p-2 text-center drop-shadow-md bg-surface-100-900"
		>
			<h2 class="text-xl font-bold">{school.name}</h2>
			<h3 class="text-xl">{school.college}</h3>
			<h5 class="text-surface-500">
				<span>{school.dates.end}</span> -
				<span>{school.location.city}, {school.location.state}</span>
			</h5>
			{#each school.degrees as degree}
				<h4 class="italic">{degree}</h4>
			{/each}
		</article>
	{/each}
</aside>

<article id="professional">
	<h1 class="mx-2 text-center text-4xl">Professional Experience</h1>

	{#each professional as workplace}
		<section
			class="z-5 card m-4 rounded-lg p-4 drop-shadow-md bg-surface-100-900"
		>
			<div class="overflow-x-scroll">
				<h2 class="inline font-extrabold">{workplace.company}</h2>
				<h3 class="float-end ml-2 inline font-light">{workplace.position}</h3>
			</div>
			<h4 class="text-surface-500">
				<span>{workplace.start_date}</span> -
				<span>{workplace.end_date}</span>
				<span class="float-end block italic sm:inline"
					>{workplace.location} ({workplace.site})</span
				>
			</h4>
			<hr class="hr my-4 border-t-2" />
			<ul class="l mx-8 my-3 list-disc">
				{#each workplace.points as point}
					<li><span>{@html point}</span></li>
				{/each}
			</ul>
		</section>
	{/each}
</article>

<article id="open-source">
	<h1 class="mx-2 text-center text-4xl">Open Source Contributions</h1>

	{#each open_source as os}
		<section
			class="z-5 card m-4 rounded-lg p-4 drop-shadow-md bg-surface-100-900"
		>
			<h2 class="font-bold">{os.name}</h2>

			<hr class="hr my-4 border-t-2" />

			{#each os.contributions as contribution}
				<h3 class="inline">
					{#each contribution.projects as project, index}
						<a href={project.link} target="_blank" rel="noopener noreferrer">
							<span>{project.name}</span>
						</a>
						{#if index < contribution.projects.length - 1}
							<span>/&nbsp;</span>
						{/if}
					{/each}
				</h3>

				<ul class="mx-8 my-3 list-disc">
					{#each contribution.points as point}
						<li><span>{@html point}</span></li>
					{/each}
				</ul>
			{/each}
		</section>
	{/each}
</article>

<article id="skills" class="mb-4">
	<h1 class="mx-2 text-center text-4xl">Technical Skills</h1>

	<div class="flex flex-col flex-wrap justify-between sm:flex-row">
		{#each skills as skill}
			<div
				class="z-5 card m-4 rounded-lg p-4 drop-shadow-md bg-surface-100-900"
			>
				<h2 class="text-center">{skill.name}</h2>

				<hr class="hr my-4 border-t-2" />

				<span class="block text-center">
					{#each skill.items as item, index}
						{item}
						{#if index < skill.items.length - 1}
							<span> ·&nbsp;</span>
						{/if}
					{/each}
				</span>
			</div>
		{/each}
	</div>
</article>
