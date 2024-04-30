// Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇

  async function sprintChallenge5() {

    const footer = document.querySelector('footer')
    
    footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY 2023`
    
    const cards = document.querySelector(".cards");
    
    
    function updateHeaderText(text) {
      const header = document.querySelector('header p'); 
      if (header) {
        header.textContent = text;
      }
    }
    
    
    async function getLearnersFromAPI(apiUrl) {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        updateHeaderText('No learner is selected');
        return data;
      } catch (error) {
        console.error('Fetch error:', error);
        return [];
      }
    }
    
    async function getMentorsFromAPI(apiUrl) {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Fetch error:', error);
        return [];
      }
    }
    
    function getMentorDetails(mentorId, mentorList) {
      const mentor = mentorList.find(mentor => mentor.id === mentorId);  
      return mentor 
    }
    
    async function createCard({ id, fullName, email, mentors }) {
      const cardElement = document.createElement('div');
      cardElement.classList.add('card');
    
      const name = document.createElement('h3');
      name.textContent = `${fullName}`;
    
      const contact = document.createElement('div');
      contact.textContent = `${email}`;
    
      const teacher = document.createElement('h4');
      teacher.classList.add('closed');
      teacher.textContent = `Mentors`;
    
      const mentorListElement = document.createElement('ul');
      mentorListElement.classList.add('closed');   
      
      mentors.forEach(mentorId => {
        const mentor = getMentorDetails(mentorId, mentorList);
        const mentorItem = document.createElement('li');
        mentorItem.textContent = `${mentor.firstName} ${mentor.lastName}`;
        mentorListElement.appendChild(mentorItem);
      });
      
      cardElement.appendChild(name);
      cardElement.appendChild(contact);
      cardElement.appendChild(teacher);
      cardElement.appendChild(mentorListElement);
    
      cardElement.addEventListener("click", () => {
        const cardsContainer = document.querySelector(".cards")
        const selectedCard = cardsContainer.querySelector(".selected")
        if(!cardElement.classList.contains("selected")){
          cardElement.classList.add("selected");
        } 
        if(selectedCard){
          selectedCard.classList.remove("selected")
        }
        const isSelected = cardElement.classList.contains("selected");
        const learnerIdElement = name.querySelector('.learner-id');
        if (isSelected) {
          if (!learnerIdElement) {
            const learnerId = document.createElement('span');
            learnerId.textContent = ` ID ${id}`;
            learnerId.classList.add('learner-id');
            name.textContent = `${fullName},`;
            name.appendChild(learnerId);
          }
          updateHeaderText(`The selected learner is ${fullName}`);
        } else {
          if (learnerIdElement) {
            name.textContent = `${fullName}`;
            learnerIdElement.remove();
            updateHeaderText('No learner is selected');
          }
        }
      });
    
      teacher.addEventListener("click", () => {
        teacher.classList.toggle("open");
        teacher.classList.toggle("closed");  
    
      });
    
      cards.appendChild(cardElement);
    }
    
    const learnerApiUrl = "http://localhost:3003/api/learners";
    const mentorApiUrl = "http://localhost:3003/api/mentors"; 
    
    const [learners, mentorList] = await Promise.all([
      getLearnersFromAPI(learnerApiUrl),
      getMentorsFromAPI(mentorApiUrl)
    ]);
    
    learners.forEach(createCard);
    
    }

  // 👆 WORK WORK ABOVE THIS LINE 👆


// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
