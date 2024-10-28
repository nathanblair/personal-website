export const contact_info = {
	website: {
		link: 'https://github.com/nathanblair',
		name: 'github.com/nathanblair',
	},
	telephone: {
		country_code: '1',
		area_code: '937',
		prefix: '537',
		line_number: '0724',
	},
}

export const education = [
	{
		name: 'University of Cincinnati',
		college: 'College of Engineering and Applied Sciences',
		degrees: ['N/A Materials Science and Engineering'],
		dates: {
			start: 'August 2009',
			end: 'June 2012',
		},
		location: {
			city: 'Dayton',
			state: 'Ohio',
			country: 'USA',
		},
	},
	{
		name: 'Wright State University',
		college: 'College of Engineering',
		degrees: [
			'B.S. Materials Science and Engineering',
			'B.S. Mechanical Engineering',
		],
		dates: {
			start: 'September 2012',
			end: 'May 2015',
		},
		location: {
			city: 'Dayton',
			state: 'Ohio',
			country: 'USA',
		},
	},
]

export const skills = [
	{
		name: 'Languages',
		items: ['Go', 'Rust', 'Python', 'JavaScript/TypeScript'],
	},
	{
		name: 'Frameworks',
		items: ['NodeJS', 'Svelte/Kit', 'ReactJS/Native'],
	},
	{
		name: 'Tools',
		items: ['git', 'docker', 'kubernetes', 'ansible', 'terraform'],
	},
	{
		name: 'Platforms',
		items: ['AWS', 'Azure', 'Embedded (Raspberry Pi)'],
	},
	{
		name: 'Programs',
		items: ['GitHub', 'Azure DevOps', 'GitLab'],
	},
]

export const professional = [
	{
		company: 'TEN Leasing',
		position: 'DevOps Engineer',
		start_date: 'September 2023',
		end_date: 'Present',
		location: 'Columbus, OH',
		site: 'Hybrid',
		points: [
			'Provisioned Azure cloud resources to back customer portal \
      (including Azure App Services, Container Apps, Azure SQL Managed \
      Instances, et al.)',
			'Guided technical team on cloud architecture fundamentals and leveraging \
      Azure resources to minimize developer work',
			'Facilitated onboarding of 4 new companies and their IT/Operations teams \
      into existing tech team under direction of CTO',
		],
	},
	{
		company: 'Siemens (EDA)',
		position: 'Principal Infrastructure Engineer',
		start_date: 'June 2023',
		end_date: 'September 2023',
		location: 'Wilsonville, OR',
		site: 'Remote',
		points: [
			'Maintained and improved legacy pet-based VMs through AWS AMIs',
			'Mentored other developers on tools and AWS cloud and security practices',
			'Developed new customer infrastructure using Terragrunt',
		],
	},
	{
		company: 'Nant Games',
		position: 'DevOps Engineer',
		start_date: 'September 2022',
		end_date: 'June 2023',
		location: 'San Diego, CA',
		site: 'Remote',
		points: [
			'Managed dedicated virtual machine pets for internal company metrics \
      (Bl/analytics team)',
			'Utilized Azure platform to create, manage, and deploy multiple \
      managed-Kubernetes game servers',
			'Managed helm charts and releases for game server clusters',
		],
	},
	{
		company: 'Genetesis',
		position: 'Software Engineering Manager',
		start_date: 'July 2022',
		end_date: 'September 2022',
		location: 'Mason, OH',
		site: 'Hybrid',
		points: [
			'Wrote specifications for Disaster Recovery Plans and other Runbooks',
			'Managed packaging and deployment of internal Python packages based on \
      numpy, scipi, et al.',
			'Managed deployment of Python back-end applications',
		],
	},
	{
		company: 'Genetesis',
		position: 'DevOps Engineer',
		start_date: 'November 2020',
		end_date: 'July 2022',
		location: 'Mason, OH',
		site: 'Hybrid',
		points: [
			'Developed installer programs for desktop apps using Go and managed their \
      CI/CD automation',
			'Managed packaging and deployment of internal Python packages based on \
      numpy, scipi, et al.',
			'Managed deployment of Python back-end applications',
		],
	},
	{
		company: 'Ascendum',
		position: 'Software Developer',
		start_date: 'May 2019',
		end_date: 'November 2020',
		location: 'Blue Ash, OH',
		site: 'Hybrid',
		points: [
			'Designed and developed Microsoft Teams App for Outlook Calendar using \
      <code>TypeScript</code> and <code>ReactJS</code>',
			'Developed and published iOS and Google Play game using <code>React \
      Native</code>',
			'Created and managed Continuous Delivery (including codesigning with \
      FastLane) for Mobile Apps using GitHub Actions',
		],
	},
	{
		company: 'Blue Quartz',
		position: 'Software Developer',
		start_date: 'December 2018',
		end_date: 'May 2019',
		location: 'Springboro, OH',
		site: 'On Site',
		points: [
			'Developed filters for converting RGB images to grayscale using weighted, \
      lightness, and single channel algorithms in <code>C++</code>',
			'Wrote algorithms to blend containers of images together by converting \
      image data into RGB values and blending spatially adjacent containers in \
      <code>C++</code>',
		],
	},
]

export const open_source = [
	{
		name: 'Sonic Original Software',
		contributions: [
			{
				projects: [
					{
						name: 'utils',
						link: 'https://github.com/SonicOriginalSoftware/utils',
					},
				],
				points: [
					'<code>rust</code> implementation of a select number of \
          <code>coreutils</code>. Not for POSIX compliancy but for use by \
          <em>people</em>.',
				],
			},
			{
				projects: [
					{
						name: 'cumulus',
						link: 'https://github.com/SonicOriginalSoftware/cumulus',
					},
				],
				points: [
					'<code>go</code>, <code>sveltekit</code>, and <code>auth.js</code> \
          system integrating <code>vcs</code>, project management, automation, \
          and more.',
				],
			},
			{
				projects: [
					{
						name: 'logger',
						link: 'https://github.com/SonicOriginalSoftware/logger',
					},
				],
				points: [
					'A logging library. Written in <code>go</code>. \
          Future work to include structured logging to \
          make a <code>std+</code> library for logging.',
				],
			},
		],
	},
	{
		name: 'Other',
		contributions: [
			{
				projects: [
					{
						name: 'Node.js',
						link: 'https://github.com/nodejs/node',
					},
				],
				points: [
					'Code and build script modifications to permit node to compile and run \
          on <code>alpine</code> systems',
				],
			},
			{
				projects: [
					{
						name: 'Auth.js',
						link: 'https://github.com/nextauthjs/next-auth',
					},
					{
						name: 'SvelteKit',
						link: 'https://github.com/sveltejs/kit',
					},
				],
				points: [
					'Determined source of an issue preventing attaching \
          <code>auth.js</code> system with <code>Svelte.js</code> and Cloudflare \
          <code>D1</code>.',
				],
			},
		],
	},
]
