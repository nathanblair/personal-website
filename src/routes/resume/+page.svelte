<script lang="ts">
	import {
		contact_info,
		education,
		open_source,
		professional,
		skills,
	} from '$lib/resume'
</script>

<h1 class="mt-4 text-center text-4xl">Education</h1>
<section
	class="m-4 grid grid-cols-1 gap-3 sm:grid-cols-{Math.min(
		2,
		education.length,
	)} md:grid-cols-{Math.min(3, education.length)} lg:grid-cols-{Math.min(
		4,
		education.length,
	)}"
>
	{#each education as school}
		<article
			class="z-5 card rounded-lg p-2 text-center drop-shadow-md bg-surface-100-900"
		>
			<h2 class="text-xl font-bold">{school.name}</h2>
			<h3 class="text-xl">{school.college}</h3>
			<h5 class="my-1 flex justify-around text-surface-500">
				<span class="">{school.dates.start} - {school.dates.end}</span>
				<span class="">{school.location.city}, {school.location.state}</span>
			</h5>
			{#each school.degrees as degree}
				<h4 class="italic leading-relaxed">{degree}</h4>
			{/each}
		</article>
	{/each}
</section>

<h1 class="mx-2 text-center text-4xl">Professional Experience</h1>
<section
	id="professional"
	class="m-4 grid grid-cols-1 gap-3 sm:grid-cols-{Math.min(
		2,
		professional.length,
	)}"
>
	{#each professional as workplace}
		<section class="z-5 card rounded-lg p-4 drop-shadow-md bg-surface-100-900">
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
</section>

<h1 class="mx-2 text-center text-4xl">Open Source Contributions</h1>
<section id="open-source">
	<div
		class="m-4 grid grid-cols-1 gap-3 sm:grid-cols-{Math.min(
			2,
			professional.length,
		)}"
	>
		{#each open_source as os}
			<section
				class="z-5 card rounded-lg p-4 drop-shadow-md bg-surface-100-900"
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
	</div>
</section>

<h1 class="mx-2 mb-4 text-center text-4xl">Technical Skills</h1>
<section
	id="skills"
	class="m-4 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
>
	{#each skills as skill}
		<div class="z-5 card rounded-lg p-4 drop-shadow-md bg-surface-100-900">
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
</section>

<section id="contact-info" class="mb-5 text-center">
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
