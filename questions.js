// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners for subject buttons
    document.querySelectorAll('.nav-btn[data-subject]').forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all subject buttons
            document.querySelectorAll('.nav-btn[data-subject]').forEach(btn => {
                btn.classList.remove('active');
            });
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding content
            updateContent();
        });
    });

    // Add event listeners for semester buttons
    document.querySelectorAll('.semester-btn').forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all semester buttons
            document.querySelectorAll('.semester-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding content
            updateContent();
        });
    });

    // Set up content and attach event listeners
    updateContent();
});

function updateContent() {
    // Get active subject and semester
    const activeSubject = document.querySelector('.nav-btn[data-subject].active').dataset.subject;
    const activeSemester = document.querySelector('.semester-btn.active').dataset.semester;
    
    // Hide all content
    document.querySelectorAll('.semester-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Show selected content
    const contentId = `${activeSubject}-${activeSemester}`;
    const contentElement = document.getElementById(contentId);
    if (contentElement) {
        contentElement.classList.add('active');
    }
    
    // Add click handlers to all section-content elements
    document.querySelectorAll('.section-content').forEach(section => {
        section.addEventListener('click', function() {
            const subject = this.dataset.subject;
            const unit = this.dataset.unit;
            const lesson = this.dataset.lesson;
            
            handleSectionClick(subject, unit, lesson);
        });
    });
}

function handleSectionClick(subject, unit, lesson) {
    try {
        // Get the questions for this lesson from the data structure
        const questions = getQuestions(subject, unit, lesson);
        
        if (questions && questions.length > 0) {
            displayQuestions(subject, unit, lesson, questions);
        } else {
            // No questions found for this lesson
            showError(subject, unit, lesson);
        }
    } catch (error) {
        console.error("Error handling section click:", error);
        showError(subject, unit, lesson);
    }
}

function displayQuestions(subject, unit, lesson, questions) {
    const modal = document.getElementById('questionModal');
    const modalTitle = document.getElementById('modalTitle');
    const questionContent = document.getElementById('questionContent');

    modalTitle.textContent = `${subject} - ${unit} - ${lesson}`;
    questionContent.innerHTML = '';

    questions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-container';
        questionDiv.innerHTML = `
            <p><strong>Question ${index + 1}:</strong> ${question.question}</p>
            ${question.options ? `
                <ul>
                    ${question.options.map(option => `<li>${option}</li>`).join('')}
                </ul>
            ` : ''}
            <p><strong>Answer:</strong> ${question.answer}</p>
        `;
        questionContent.appendChild(questionDiv);
    });

    modal.style.display = 'block';
}

function showError(subject, unit, lesson) {
    const modal = document.getElementById('questionModal');
    const modalTitle = document.getElementById('modalTitle');
    const questionContent = document.getElementById('questionContent');

    modalTitle.textContent = 'No Questions Found';
    questionContent.innerHTML = `
        <div class="error-message">
            No questions available yet for ${subject} - ${unit} - ${lesson}
        </div>
        <div class="add-question-prompt">
            <p>Would you like to add questions for this topic?</p>
            <button class="btn add-question-btn">Add Questions</button>
        </div>
    `;

    modal.style.display = 'block';
    
    // Optionally add event listener for the Add Questions button
    const addBtn = questionContent.querySelector('.add-question-btn');
    if (addBtn) {
        addBtn.addEventListener('click', function() {
            // This could open a form to add new questions
            alert('Question creation feature coming soon!');
        });
    }
}

function closeModal() {
    document.getElementById('questionModal').style.display = 'none';
}
