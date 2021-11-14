<script>
  import School from "../components/Resume/School.svelte"
  import Job from "../components/Resume/Job.svelte"
  import Contribution from "../components/Resume/Contribution.svelte"

  import SkillList from "../components/Resume/SkillList.svelte"
  import CourseList from "../components/Resume/CourseList.svelte"

  import FlexGrid from "../components/FlexGrid.svelte"
  import { page_default_title } from "../constants.js"

  document.title = page_default_title + " | Resumé"

  const current_year = new Date().getFullYear()
</script>

<section id="education">
  <h1>Education</h1>
  <div class="content">
    <School
      universityName="Wright State University"
      collegeName="College of Engineering and Computer Science"
      location="Dayton, OH"
      from="2012"
      to="2015"
      degreeList={[
        "B.S. Mechanical Engineering",
        "B.S. Materials Science and Engineering",
      ]}
    />

    <School
      universityName="University of Cincinnati"
      collegeName="College of Engineering and Applied Sciences"
      location="Cincinnati, OH"
      from="2009"
      to="2012"
      degreeList={["N/A Materials Science and Engineering"]}
    />
  </div>
</section>

<section id="professional">
  <h1>Professional</h1>
  <div class="content">
    <Job
      employerName="Genetesis"
      jobTitle="DevOps Engineer"
      location="Mason, OH"
      monthFrom="November"
      monthTo=""
      yearFrom="2020"
      yearTo="Present"
      jobHighlights={[
        "Developed installer programs for desktop apps using <code>go</code>",
        "Created and managed all company's CI/CD pipelines and automation",
        "Automated bare-metal machine image generation and deployment to embedded devices",
        "Migrated AWS EKS instances running company’s microservices from manual provisioning to automated provisioning using <code>terraform</code>",
      ]}
    />

    <Job
      employerName="Ascendum"
      jobTitle="DevOps Engineer"
      location="Blue Ash, OH"
      monthFrom="May"
      monthTo="November"
      yearFrom="2019"
      yearTo="2020"
      jobHighlights={[
        "Created and managed automation pipelines for iOS (including codesigning) and Android apps",
        "Employed Google Firebase and Google Cloud Platform for provisioning mobile application resources like notification services and cloud databases",
        "Assisted clients in setting up AWS resources like AWS Lambda, DynamoDB, AWS RDS (MySQL), various EC2 and other container and virtual hosts",
        "Utilized Azure and Azure DevOps to host wide array of apps developed across the company",
      ]}
    />

    <Job
      employerName="BlueQuartz Software"
      jobTitle="Junior Computer Programmer III"
      location="Springboro, OH"
      monthFrom="December"
      monthTo="May"
      yearFrom="2018"
      yearTo="2019"
      jobHighlights={[
        "Created data/image Grayscale filter and unit test",
        "Developed filter to register images, un-distort them using amoeba/least square regression algorithm",
        "Assisted clients in setting up AWS resources like AWS Lambda, DynamoDB, AWS RDS (MySQL), various EC2 and other container and virtual hosts",
        "Worked in open-source, cross-platform C++ environment using tools including Qt and CMake",
      ]}
    />

    <Job
      employerName="iTSpeeX (Contract)"
      jobTitle="QA Department Head"
      location="Mason, OH"
      monthFrom="June"
      monthTo="December"
      yearFrom="2018"
      yearTo="2018"
      jobHighlights={[
        "Created the QA Department and assigned internal AGILE procedures",
        "Brought on and set up JIRA, Bitbucket, and Bamboo Server Editions",
        "Set up automated build and testing server using Bamboo",
        "Lead the integration of <code>git</code> version control and gitflow methodologies to be adopted by the development team",
      ]}
    />
  </div>
</section>

<section id="open-source">
  <h1>Open Source</h1>
  <div class="content">
    <Contribution
      projectName="NodeJS"
      role="Contributor"
      contributionList={[
        "Modifications to configure script to allow compilation using any arbitrary <code>clang</code> vendor (fixes <code>clang</code> compilation on Alpine and Void Linux)",
      ]}
    />

    <Contribution
      projectName="Alpine Linux"
      role="Contributor"
      contributionList={[
        "Issue reporting, debugging, and fixing for various pacakges including <code>nodejs</code> and <code>xkeyboard-config</code>",
      ]}
    />

    <Contribution
      projectName="Void Linux"
      role="Contributor"
      contributionList={["Packager for static NodeJS early version 14"]}
    />

    <Contribution
      projectName="Jester NPM Package"
      role="Developer"
      contributionList={[
        "<code>jester</code> is an npm package that simplifies javascript unit testing",
      ]}
    />

    <!-- TODO Add packages for unarchiver and unzipper (and maybe arg-parser?) -->
  </div>
</section>

<section id="skills">
  <h1>Skills</h1>

  <FlexGrid>
    <SkillList
      skillTitle="Languages"
      skill={[
        { skill: "Python", experience: `${current_year - 2014} years` },
        { skill: "C++", experience: `5 years` },
        { skill: "Javascript", experience: `${current_year - 2016} years` },
        { skill: "C#", experience: `4 years` },
        { skill: "Rust", experience: `${current_year - 2019} years` },
        { skill: "Go", experience: `${current_year - 2020} years` },
      ]}
    />

    <SkillList
      skillTitle="Tools"
      skill={[
        {
          skill: "<code>git</code>",
          experience: `${current_year - 2013} years`,
        },
        {
          skill: "<code>docker</code>",
          experience: `${current_year - 2018} years`,
        },
        { skill: "Google OAuth", experience: `${current_year - 2018} years` },
        { skill: "Unity Engine", experience: `3 years` },
        {
          skill: "<code>kubernetes</code>",
          experience: `${current_year - 2019} years`,
        },
        { skill: "Jenkins", experience: `2 years` },
        {
          skill: "<code>terraform</code>",
          experience: `${current_year - 2019} years`,
        },
        { skill: "Slack Apps", experience: `${current_year - 2019} years` },
        { skill: "Unreal Engine", experience: `1 years` },
      ]}
    />

    <SkillList
      skillTitle="Frameworks"
      skill={[
        { skill: "NodeJS", experience: `${current_year - 2016} years` },
        { skill: "Typescript", experience: `2 years` },
        { skill: "React Native", experience: `1 years` },
        { skill: "Angular", experience: `1 years` },
        { skill: "Svelte", experience: `${current_year - 2020} years` },
        { skill: "Vue", experience: `1 years` },
      ]}
    />

    <SkillList
      skillTitle="Databases"
      skill={[
        { skill: "Microsoft SQL Server", experience: `5 years` },
        { skill: "SQLite", experience: `4 years` },
        { skill: "NoSQL", experience: `3 years` },
        { skill: "MySQL", experience: `2 years` },
        { skill: "Redis", experience: `${current_year - 2019} years` },
      ]}
    />
  </FlexGrid>
</section>

<section id="cloud-technologies">
  <h1>Cloud Technologies</h1>

  <FlexGrid>
    <SkillList
      skillTitle="Amazon Web Services"
      skill={[
        { skill: "EC2", experience: `${current_year - 2019} years` },
        { skill: "S3", experience: `${current_year - 2019} years` },
        { skill: "VPC", experience: `${current_year - 2019} years` },
        { skill: "Lambda", experience: `2 years` },
        { skill: "DynamoDB", experience: `${current_year - 2019} years` },
        { skill: "Route53", experience: `${current_year - 2019} years` },
        { skill: "RDS", experience: `1 years` },
        { skill: "DocumentDB", experience: `1 years` },
        { skill: "Elasticsearch", experience: `1 years` },
        { skill: "EKS", experience: `${current_year - 2020} years` },
        { skill: "ELB", experience: `${current_year - 2020} years` },
        { skill: "Prometheus", experience: `${current_year - 2020} years` },
        { skill: "Grafana", experience: `${current_year - 2020} years` },
        { skill: "KMS", experience: `${current_year - 2020} years` },
      ]}
    />

    <SkillList
      skillTitle="Google Firebase"
      skill={[
        { skill: "Authentication", experience: `${current_year - 2018} years` },
        { skill: "Firestore", experience: `${current_year - 2018} years` },
        { skill: "Hosting", experience: `${current_year - 2018} years` },
        { skill: "Functions", experience: `${current_year - 2018} years` },
        { skill: "Storage", experience: `${current_year - 2019} years` },
        {
          skill: "App Distribution",
          experience: `${current_year - 2019} years`,
        },
        { skill: "Crashlytics", experience: `1 years` },
      ]}
    />

    <SkillList
      skillTitle="Google Cloud Platform"
      skill={[
        { skill: "Compute Engine", experience: `2 years` },
        { skill: "Cloud Functions", experience: `2 years` },
        { skill: "Kubernetes Engine", experience: `1 years` },
        { skill: "Cloud Build", experience: `1 years` },
        { skill: "Container Registry", experience: `1 years` },
        { skill: "Cloud Run", experience: `1 years` },
      ]}
    />

    <SkillList
      skillTitle="Azure"
      skill={[
        { skill: "DevOps", experience: `2 years` },
        { skill: "Pipelines", experience: `2 years` },
        { skill: "Functions", experience: `2 years` },
        { skill: "Artifacts", experience: `2 years` },
        { skill: "Service Bus", experience: `1 years` },
        { skill: "Virtual Machines", experience: `1 years` },
        { skill: "AKS", experience: `1 years` },
        { skill: "App Service", experience: `1 years` },
        { skill: "SQL Database", experience: `1 years` },
        { skill: "Cosmos", experience: `1 years` },
        { skill: "Virtual Network", experience: `1 years` },
        { skill: "Load Balancer", experience: `1 years` },
        { skill: "Application Gateway", experience: `1 years` },
        { skill: "DNS", experience: `1 years` },
        { skill: "Web Apps", experience: `1 years` },
        { skill: "Static Web Apps", experience: `1 years` },
        { skill: "Virtual Desktop", experience: `1 years` },
      ]}
    />

    <SkillList
      skillTitle="GitHub"
      skill={[
        {
          skill: "Code Repository",
          experience: `${current_year - 2014} years`,
        },
        { skill: "Actions", experience: `${current_year - 2018} years` },
        {
          skill: "Container Registry",
          experience: `${current_year - 2020} years`,
        },
        {
          skill: "NPM Package Registry",
          experience: `${current_year - 2020} years`,
        },
      ]}
    />
  </FlexGrid>
</section>

<section id="courses">
  <h1>Coursework</h1>

  <FlexGrid>
    <CourseList
      degree="Undergraduate"
      discipline="Materials"
      courses={[
        "Corrosion",
        "Failure Analysis and Materials Selection",
        "Mechanical Behavior of Metals",
        "Physical Metallurgy",
        "Ceramics I",
        "Polymers I",
        "Metallography and Testing",
        "Materials Characterization",
      ]}
    />

    <CourseList
      degree="Undergraduate"
      discipline="Mechanical"
      courses={[
        "Fluid Mechanics",
        "Aeronautics",
        "Mechanical Vibrations",
        "Finite Element Analysis",
        "Mechanical Design I & II",
        "SolidWorks Modeling",
        "Circuit Analysis",
        "MATLAB for Engineers",
      ]}
    />

    <CourseList
      degree="Graduate"
      discipline="Materials"
      courses={["Electrical and Optical of Ceramics"]}
    />
  </FlexGrid>
</section>

<style>
  h1 {
    margin: 0;
    text-align: center;
    font-size: 2em;
    font-weight: normal;
  }

  section {
    padding-bottom: 3%;
  }

  .content {
    padding: 0 3vw;
  }
</style>
