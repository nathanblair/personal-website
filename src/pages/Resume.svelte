<script>
  import School from "../components/resume/School.svelte"
  import Job from "../components/resume/Job.svelte"
  import Contribution from "../components/resume/Contribution.svelte"

  import SkillList from "../components/resume/SkillList.svelte"

  document.title = document.title + " | Resumé"
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
        "Developed installer programs for desktop apps using <span class='inline-code'>go</span>",
        "Created and managed all company's CI/CD pipelines and automation",
        "Automated bare-metal machine image generation and deployment to embedded devices",
        "Migrated AWS EKS instances running company’s microservices from manual provisioning to automated provisioning using <span class='inline-code'>terraform</span>",
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
        "Lead the integration of <span class='inline-code'>git</span> version control and gitflow methodologies to be adopted by the development team",
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
        "Modifications to configure script to allow compilation using any arbitrary <span class='inline-code'>clang</span> vendor (fixes <span class='inline-code'>clang</span> compilation on Alpine and Void Linux)",
      ]}
    />

    <Contribution
      projectName="Alpine Linux"
      role="Contributor"
      contributionList={[
        "Issue reporting, debugging, and fixing for various pacakges including <span class='inlide-code'>nodejs</span> and <span class='inline-code'>xkeyboard-config</span>",
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
        "<span class='inline-code'>jester</span> is an npm package that simplifies javascript unit testing",
      ]}
    />
  </div>
</section>

<section id="skills">
  <h1>Skills</h1>
  <SkillList
    skillTitle="Languages"
    skill={[
      { skill: "Python", experience: "8 years" },
      { skill: "C++", experience: "5 years" },
      { skill: "Javascript", experience: "5 years" },
      { skill: "C#", experience: "3 years" },
      { skill: "Go", experience: "1 year" },
      { skill: "Rust", experience: "1 year" },
    ]}
  />

  <SkillList
    skillTitle="Tools"
    skill={[
      { skill: "<span class='code'>git</span>", experience: "8 years" },
      { skill: "<span class='code'>docker</span>", experience: "3 years" },
      { skill: "Unity Engine", experience: "3 years" },
      { skill: "Google OAuth", experience: "3 years" },
      { skill: "<span class='code'>kubernetes</span>", experience: "2 years" },
      { skill: "Jenkins", experience: "2 years" },
      { skill: "<span class='code'>terraform</span>", experience: "1 years" },
      { skill: "Slack Apps", experience: "1 year" },
      { skill: "Unreal Engine", experience: "1 year" },
    ]}
  />

  <SkillList
    skillTitle="Frameworks"
    skill={[
      { skill: "NodeJS", experience: "4 years" },
      { skill: "Typescript", experience: "2 years" },
      { skill: "React Native", experience: "1 year" },
      { skill: "Angular", experience: "1 year" },
      { skill: "Svelte", experience: "1 year" },
      { skill: "Vue", experience: "1 year" },
    ]}
  />

  <SkillList
    skillTitle="Databases"
    skill={[
      { skill: "Microsoft SQL Server", experience: "4 years" },
      { skill: "SQLite", experience: "3 years" },
      { skill: "NoSQL", experience: "2 years" },
      { skill: "MySQL", experience: "1 year" },
      { skill: "Redis", experience: "1 year" },
    ]}
  />
</section>

<section id="cloud-technologies">
  <h1>Cloud Technologies</h1>
  <SkillList
    skillTitle="Amazon Web Services"
    skill={[
      { skill: "EKS", experience: "2 years" },
      { skill: "VPC", experience: "2 years" },
      { skill: "EC2", experience: "2 years" },
      { skill: "S3", experience: "2 years" },
      { skill: "ELB", experience: "1 year" },
      { skill: "Route53", experience: "1 year" },
      { skill: "RDS", experience: "1 year" },
      { skill: "DocumentDB", experience: "1 year" },
      { skill: "DynamoDB", experience: "1 year" },
      { skill: "Elasticsearch", experience: "1 year" },
      { skill: "Prometheus", experience: "1 year" },
      { skill: "Grafana", experience: "1 year" },
      { skill: "Lambda", experience: "1 year" },
      { skill: "KMS", experience: "1 year" },
    ]}
  />

  <SkillList
    skillTitle="Google Firebase"
    skill={[
      { skill: "Authentication", experience: "3 years" },
      { skill: "Firestore", experience: "2 years" },
      { skill: "Hosting", experience: "2 years" },
      { skill: "Functions", experience: "2 years" },
      { skill: "App Distribution", experience: "2 years" },
      { skill: "Crashlytics", experience: "1 year" },
      { skill: "Storage", experience: "1 year" },
    ]}
  />

  <SkillList
    skillTitle="Google Cloud Platform"
    skill={[
      { skill: "Compute Engine", experience: "1 year" },
      { skill: "Kubernetes Engine", experience: "1 year" },
      { skill: "Cloud Build", experience: "1 year" },
      { skill: "Container Registry", experience: "1 year" },
      { skill: "Cloud Run", experience: "1 year" },
      { skill: "Cloud Functions", experience: "1 year" },
    ]}
  />

  <SkillList
    skillTitle="Azure"
    skill={[
      { skill: "DevOps", experience: "1 year" },
      { skill: "Virtual Machines", experience: "1 year" },
      { skill: "AKS", experience: "1 year" },
      { skill: "App Service", experience: "1 year" },
      { skill: "Functions", experience: "1 year" },
      { skill: "SQL Database", experience: "1 year" },
      { skill: "Cosmos", experience: "1 year" },
      { skill: "Pipelines", experience: "1 year" },
      { skill: "Artifacts", experience: "1 year" },
      { skill: "Service Bus", experience: "1 year" },
      { skill: "Virtual Network", experience: "1 year" },
      { skill: "Load Balancer", experience: "1 year" },
      { skill: "Application Gateway", experience: "1 year" },
      { skill: "DNS", experience: "1 year" },
      { skill: "Web Apps", experience: "1 year" },
      { skill: "Static Web Apps", experience: "1 year" },
      { skill: "Virtual Desktop", experience: "1 year" },
    ]}
  />

  <SkillList
    skillTitle="GitHub"
    skill={[
      { skill: "Code Repository", experience: "7 years" },
      { skill: "Actions", experience: "3 years" },
      { skill: "Container Registry", experience: "1 year" },
      { skill: "NPM Package Registry", experience: "1 year" },
    ]}
  />
</section>

<section id="courses">
  <h1>Coursework</h1>
  <table id="course-table">
    <tr>
      <th colspan="2">Undergraduate</th>
      <th>Graduate</th>
    </tr>
    <tr>
      <th>Materials</th>
      <th>Mechanical</th>
      <th />
    </tr>
    <tr>
      <td>Corrosion</td>
      <td>Fluid Mechanics</td>
      <td>Electrical and Optical of Ceramics</td>
    </tr>
    <tr>
      <td>Failure Analysis and Materials Selection</td>
      <td>Aeronautics</td>
      <td />
    </tr>
    <tr>
      <td>Mechanical Behavior of Metals</td>
      <td>Mechanical Vibrations</td>
      <td />
    </tr>
    <tr>
      <td>Physical Metallurgy</td>
      <td>Finite Element Analysis</td>
      <td />
    </tr>
    <tr>
      <td>Ceramics I</td>
      <td>Mechanical Design I & II</td>
      <td />
    </tr>
    <tr>
      <td>Polymers I</td>
      <td>SolidWorks Modeling</td>
      <td />
    </tr>
    <tr>
      <td>Metallography and Testing</td>
      <td>Circuit Analysis</td>
      <td />
    </tr>
    <tr>
      <td>Materials Characterization</td>
      <td>MATLAB for Engineers</td>
      <td />
    </tr>
  </table>
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

  table {
    width: 95%;
    margin: 0 auto;
    table-layout: fixed;
    border-collapse: collapse;
  }

  table th {
    border-bottom: 1px solid;
    background-color: #00001e;
    color: white;
  }

  table tr:nth-child(even) {
    background-color: #909090;
  }

  table > tr {
    text-align: center;
    border-bottom: 1px solid;
  }

  @media screen and (min-width: 950px) {
    table th {
      background-color: transparent;
      color: unset;
    }

    table > tr:nth-child(even) {
      background-color: unset;
    }

    table tr {
      border-bottom: none;
    }
  }
</style>
