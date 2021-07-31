<script>
  import School from "../components/resume/School.svelte"
  import Job from "../components/resume/Job.svelte"
  import Contribution from "../components/resume/Contribution.svelte"

  document.title = document.title + " | Resumé"
</script>

<section>
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

<section>
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

<section>
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

<section>
  <h1>Skills</h1>
  <table id="skill-table">
    <tr>
      <th>Languages</th>
      <th>Tools</th>
      <th>Frameworks</th>
    </tr>
    <tr>
      <td>Python</td>
      <td><span class="code">docker</span></td>
      <td>React</td>
    </tr>
    <tr>
      <td>Go</td>
      <td><span class="code">kubernetes</span></td>
      <td>Angular</td>
    </tr>
    <tr>
      <td>Rust</td>
      <td><span class="code">terraform</span></td>
      <td>Svelte</td>
    </tr>
    <tr>
      <td>C#</td>
      <td><span class="code">git</span></td>
      <td>Vue</td>
    </tr>
    <tr>
      <td>C++/Visual C++</td>
      <td>GitHub</td>
      <td>NodeJS</td>
    </tr>
    <tr>
      <td>JavaScript/TypeScript</td>
      <td>GitHub Actions</td>
      <td />
    </tr>
    <tr>
      <td />
      <td>Slack Apps</td>
      <td />
    </tr>
    <tr>
      <td />
      <td>Unity</td>
      <td />
    </tr>
    <tr>
      <td />
      <td>Unreal Engine</td>
      <td />
    </tr>
  </table>
</section>

<section>
  <h1>Technologies</h1>
  <table id="technologies-table">
    <tr>
      <th>Amazon Web Services</th>
      <th>Google Cloud Platform</th>
      <th>Azure</th>
    </tr>
  </table>
</section>

<section>
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
