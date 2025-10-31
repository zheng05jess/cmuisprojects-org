$(document).ready(function () {
  let year = [];
  let sdg = [];
  let tech = [];
  let course = [];

  const tagColors = {
    "nopoverty": "#20B4E3",
    "zerohunger": "#E3203D",
    "equality": "#19A695",
    "promotehealth": "#F5BB24",
    "qualityeducation": "#2091E3",
    "genderequality": "#8120E3",
    "cleanwatersanitation": "#D420E3",
    "cleanenergy": "#F3890D",
    "workandeconomicgrowth": "#A6192E",
    "industryinnovationinfrastructure": "#5FA862",
    "reducedinequality": "#F43E25",
    "sustainablecities": "#544E48",
    "responsibleconsumption": "#6c9300",
    "climateaction": "#F30D89",
    "lifebelowwater": "#1940A6",
    "lifeonland": "#764E12",
    "peaceandinclusion": "#D26909",
    "partnershipsforgoals": "#4075DD",

    "api": "#20B4E3",
    "crm": "#E3203D",
    "dataanalytics": "#19A695",
    "databasesolution": "#F5BB24",
    "geographicinformationsystem": "#2091E3",
    "informationsecurityrisk": "#8120E3",
    "informationkiosk": "#D420E3",
    "mobapp": "#F3890D",
    "socialmediapage": "#A6192E",
    "softwareintegration": "#5FA862",
    "technologystrategy": "#F43E25",
    "userexperience": "#544E48",
    "webapp": "#B0E320",
    "searchengingeoptimization": "#F30D89"
  };
 // Function to collect selected checkbox values
 function getSelectedCheckboxValues(name) {
  const selectedValues = [];
  $(`input[name='${name}']:checked`).each(function () {
    selectedValues.push($(this).val());
  });
  return selectedValues;
}

// Event listener for checkbox changes
$("input[name='tech']").on("change", function () {
  tech = getSelectedCheckboxValues('tech');
  console.log(tech);
});

$("input[name='year']").on("change", function () {
  year = getSelectedCheckboxValues('year');
  console.log(year);
});

$("input[name='sdg']").on("change", function () {
  sdg = getSelectedCheckboxValues('sdg');
  console.log(sdg);
});

$("input[name='course']").on("change", function () {
  course = getSelectedCheckboxValues('course');
  console.log(course);
});

let selectedCompany;
$(".ClosePopup").click(function () {
  $("#popup").fadeOut();
});

$("#popup").click(function (event) {
  if (event.target === this) {
    $(this).fadeOut();
  }
});

$.ajax({
  cache: false,
  url: "./assets/js/public-projects.json",
  dataType: "json",
  success: function (data) {

    let filteredProjects = () => {
      var techCompanies = data.filter(function (company) {
        let filterSdg =
          sdg?.length > 0
            ? sdg.some((item) => company.sdg?.includes(item))
            : true;
        let filterTechnology =
          tech?.length > 0
            ? tech.some((item) => company.tech?.includes(item))
            : true;
        let filterYear =
          year?.length > 0
            ? year.some((item) => company.year?.includes(item))
            : true;
        return filterSdg && filterTechnology && filterYear;
      });
      return techCompanies;
    };

    // function renderProjectsByYear(projects) {
    //   const $companyWrapperContainer = $("#companyWrapperContainer");
    //   $companyWrapperContainer.empty(); // Clear previous projects

    //   // Check if projects is an array
    //   if (!Array.isArray(projects)) {
    //     // Handle the case where projects is not an array
    //     $companyWrapperContainer.html("<p>No records found</p>");
    //     return;
    //   }

    //   // Group projects by year
    //   const projectsByYear = {};
    //   projects.forEach((project) => {
    //     let year = null;

    //     // Auto-detect year from the 'year' field
    //     if (project.year) {
    //       year = Array.isArray(project.year) ? project.year[0] : project.year;
    //       // Extract year from date string (if applicable)
    //       if (typeof year === "string" && year.match(/^\d{4}$/)) {
    //         year = year.substring(0, 4);
    //       }
    //     }

    //     // If year is still null or invalid, set it to 'Unknown'
    //     if (!year || !parseInt(year, 10)) {
    //       year = "Unknown";
    //     }

    //     if (!projectsByYear[year]) {
    //       projectsByYear[year] = [];
    //     }
    //     projectsByYear[year].push(project);
    //   });

    //   // Reverse the list here to make sure that the most recent projects are at the top and oldest at the bottom
    //   let yearsList = Object.keys(projectsByYear).reverse();

    //   // Render projects with headings
    //   yearsList.forEach((year) => {
    //     let yearProjects = projectsByYear[year];

    //     // Sort projects alphabetically by partner name
    //     yearProjects.sort((a, b) => {
    //       let nameA = a.partner.toUpperCase();
    //       let nameB = b.partner.toUpperCase();
    //       if (nameA < nameB) {
    //         return -1;
    //       }
    //       if (nameA > nameB) {
    //         return 1;
    //       }
    //       return 0;
    //     });

    //     if (yearProjects.length > 0) {
    //       // Append year heading
    //       $companyWrapperContainer.append(
    //         `<h1 class="w-100 text-center text-red fw-semibold">Spring ${year}</h4>`
    //       );

    //       // Append projects
    //       yearProjects.forEach((project) => {
    //         const companyWrapper = $(
    //           '<div class="companyWrapper d-flex align-items-center"></div>'
    //         );

    //         companyWrapper.click(() => {
    //           clickedCompanyData = project;
    //           if (clickedCompanyData) {
    //             $("#popup .popupLogo").attr("src", clickedCompanyData?.logo);
    //             $("#popup .popup-content h6:eq(0)").html(
    //               "<span class='fw-bold me-2'>Community Partner:</span>" +
    //                 clickedCompanyData?.partner
    //             );
    //             $("#popup .popup-content h6:eq(1)").html(
    //               "<span class='fw-bold me-2'>Representatives:</span>" +
    //                 clickedCompanyData?.representatives.join(", ")
    //             );
    //             $("#popup .popup-content h6:eq(2)").html(
    //               "<span class='fw-bold me-2'>Student Team:</span>" +
    //                 clickedCompanyData?.students.join(", ")
    //             );
    //             $("#popup .popup-content h6:eq(3)").html(
    //               "<span class='fw-bold me-2'>Year:</span>" +
    //                 (Array.isArray(clickedCompanyData?.year) ? clickedCompanyData.year.join(", ") : clickedCompanyData?.year || "N/A")
    //             );
    //             // Add SDG tags with dynamic colors
    //             const sdgTags = clickedCompanyData?.sdg
    //               ?.map((tag) => {
    //                 const color = tagColors[tag?.toLowerCase()] || "#000";
    //           //   Fallback color if tag is not in mapping
    //                 if (tag == ""){
    //                   tag = "N/A"
    //                 }

    //                 return `<div class='tag-box'><div class='circle' style='background-color: ${color};'></div><span class='tag-name'>${tag}</span></div>`;
    //               })
    //               .join("");
    //             $("#popup .popup-content h6:eq(4)").html(
    //               "<span class='fw-bold me-2'>SDG Tags:</span>" +
    //                 (sdgTags || "N/A")
    //             );

    //             // Add Technology tags with dynamic colors
    //             const techTags = clickedCompanyData?.tech
    //               ?.map((tag) => {
    //                 const color = tagColors[tag] || "#000"; // Fallback color if tag is not in mapping
    //                 if (tag == ""){
    //                   tag = "N/A"
    //                 }
    //                 return `<div class='tag-box'><div class='circle' style='background-color: ${color};'></div><span class='tag-name'>${tag}</span></div>`;
    //               })
    //               .join("");
    //             $("#popup .popup-content h6:eq(5)").html(
    //               "<span class='fw-bold me-2'>Technology Tags:</span>" +
    //                 (techTags || "N/A")
    //             );

    //             $("#popup .popup-content h6:eq(6)").html(
    //               clickedCompanyData?.desc
    //             );

    //             $("#popup").fadeIn();

    //           }
    //         });

    //         const imgElement = $(
    //           '<img class="img-fluid imgCentered" alt=""/>'
    //         ).attr("src", project?.logo);
    //         companyWrapper.append(imgElement);
    //         $companyWrapperContainer.append(companyWrapper);
    //       });
    //     }
    //   });

    //   // Show "No records found" message if no projects
    //   if (Object.keys(projectsByYear).length === 0) {
    //     $companyWrapperContainer.html("<p>No records found</p>");
    //   }
    // }

    function renderProjectsByList(projects) {
      const $companyWrapperContainer = $("#companyWrapperContainer");
      $companyWrapperContainer.empty();
    
      if (!Array.isArray(projects) || projects.length === 0) {
        $companyWrapperContainer.html("<p>No records found</p>");
        return;
      }
    
      // Sort alphabetically by partner name
      projects.sort((a, b) => a.partner.localeCompare(b.partner));
    
      projects.forEach((project) => {
        const companyWrapper = $('<div class="companyWrapper d-flex align-items-center"></div>');
    
        companyWrapper.click(() => {
                    clickedCompanyData = project;
                    if (clickedCompanyData) {
                      $("#popup .popupLogo").attr("src", clickedCompanyData?.logo);
                      $("#popup .popup-content h6:eq(0)").html(
                        "<span class='fw-bold me-2'>Community Partner:</span>" +
                          clickedCompanyData?.partner
                      );
                      $("#popup .popup-content h6:eq(1)").html(
                        "<span class='fw-bold me-2'>Representatives:</span>" +
                          clickedCompanyData?.representatives.join(", ")
                      );
                      $("#popup .popup-content h6:eq(2)").html(
                        "<span class='fw-bold me-2'>Student Team:</span>" +
                          clickedCompanyData?.students.join(", ")
                      );
                      $("#popup .popup-content h6:eq(3)").html(
                        "<span class='fw-bold me-2'>Year:</span>" +
                          (Array.isArray(clickedCompanyData?.year) ? clickedCompanyData.year.join(", ") : clickedCompanyData?.year || "N/A")
                      );
                      // Add SDG tags with dynamic colors
                      const sdgTags = clickedCompanyData?.sdg
                        ?.map((tag) => {
                          const color = tagColors[tag?.toLowerCase()] || "#000";
                    //   Fallback color if tag is not in mapping
                          if (tag == ""){
                            tag = "N/A"
                          }
      
                          return `<div class='tag-box'><div class='circle' style='background-color: ${color};'></div><span class='tag-name'>${tag}</span></div>`;
                        })
                        .join("");
                      $("#popup .popup-content h6:eq(4)").html(
                        "<span class='fw-bold me-2'>SDG Tags:</span>" +
                          (sdgTags || "N/A")
                      );
      
                      // Add Technology tags with dynamic colors
                      const techTags = clickedCompanyData?.tech
                        ?.map((tag) => {
                          const color = tagColors[tag] || "#000"; // Fallback color if tag is not in mapping
                          if (tag == ""){
                            tag = "N/A"
                          }
                          return `<div class='tag-box'><div class='circle' style='background-color: ${color};'></div><span class='tag-name'>${tag}</span></div>`;
                        })
                        .join("");
                      $("#popup .popup-content h6:eq(5)").html(
                        "<span class='fw-bold me-2'>Technology Tags:</span>" +
                          (techTags || "N/A")
                      );
      
                      $("#popup .popup-content h6:eq(6)").html(
                        clickedCompanyData?.desc
                      );
      
                      $("#popup").fadeIn();
      
                    }
                  });
    
        const imgElement = $('<img class="img-fluid imgCentered" alt=""/>').attr("src", project?.logo);
        companyWrapper.append(imgElement);
        $companyWrapperContainer.append(companyWrapper);
      });
    }
    

    // URL parameter check for initial checkbox state
    const urlParams = new URLSearchParams(window.location.search);
    const sdgParam = urlParams.get('sdg');
    if (sdgParam != null) {
      const checkbox = $(`input[name='sdg'][value='${sdgParam}']`);
      if (checkbox.length) {
        checkbox.prop('checked', true); // Set checkbox as checked

        // Trigger the change event manually
        checkbox.trigger('change');
      }
    }

    let projectss = filteredProjects();
    renderProjectsByList(projectss);

     
     
    $("input[name='tech'], input[name='year'], input[name='sdg'], input[name='course']").on("change", function () {
      projectss = filteredProjects();
      renderProjectsByList(projectss);
    });
  },
  error: function (jqXHR, textStatus, errorThrown) {
    console.error("Error loading JSON file:", textStatus, errorThrown);
  },
});
});