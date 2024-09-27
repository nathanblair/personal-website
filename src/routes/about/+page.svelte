<script>
	import { name } from '$lib/constants.js'
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
					"description": "Jack of all trades. Master of some.",
					"url": "https://nathanblair.rocks/about"
				},
			}
		</script>
	`}
</svelte:head>

<header>
	<h1>Hi! I'm {name}.</h1>
</header>

<p>
	A proud millennial, tech enthusiast, and lifelong learner, I hold two Bachelor's degrees in
	Mechanical Engineering and Materials Science and Engineering. My alma mater is technically Wright
	State University in Dayton, OH but I attended the University of Cincinnati during my first three
	years of college and will always consider myself a Bearcat at heart.
</p>

<p>
	My areas of professional experience include steelmaking, failure analysis, MEMS, electronic device
	characterization and fabrication, software development and automation, systems administration, and
	swimming pool maintenance. I'm an extremely diverse individual and have a wide array of interests.
	It stems from the fact that I have an addiction to solving challenging problems and a never-ending
	desire to learn.
</p>

<p>
	Outside of my professional life I am an avid motorcyclist and musician. When I'm not getting my
	wind therapy, I can be found jamming on drum sets, guitar, and occassionally the piano. My
	personal aspirations are to be a good person each day, leaving the world a little better than the
	day before. To accomplish this on a larger scale I am committed to advocating renewable and
	sustainable energy technology and volunteering when and where I can.
</p>

<p>
	I'm interested in talking with people that share my commitment to continuous education, a
	sustainable world, and open-mindedness. I see a lot of potential in my generation to shape the
	world and I'm always open to having discussions about ways to improve our future. Contact me if
	you want to chat about cool things or would like to work on a project with me!
</p>

<style>
	header,
	p {
		padding: 20px;
	}

	h1 {
		font-weight: normal;
	}

	p {
		padding: 20px 40px;
		line-height: 2.5;
	}
</style>
