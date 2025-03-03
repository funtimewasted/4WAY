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

    // Add click handlers to all section-content elements (after content is generated)
    setTimeout(() => {
        document.querySelectorAll('.section-content').forEach(section => {
            section.addEventListener('click', function() {
                const unitElement = this.closest('.section').querySelector('.section-title');
                const subjectElement = document.querySelector('.nav-btn[data-subject].active');
                
                const subject = subjectElement.dataset.subject;
                const unit = unitElement.textContent;
                const lesson = this.textContent;

                handleSectionClick(subject, unit, lesson);
            });
        });
    }, 100);

    // Close modal when clicking outside
    window.onclick = function(event) {
        const modal = document.getElementById('questionModal');
        if (event.target == modal) {
            closeModal();
        }
    };
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
}

async function handleSectionClick(subject, unit, lesson) {
    try {
        // In a real application, this would fetch from the server
        // For the demo, we'll simulate a response or error
        const simulateSuccess = Math.random() > 0.5; // 50% chance of success for demo purposes
        
        if (simulateSuccess) {
            // Simulate successful response with mock questions
            const mockQuestions = [
                {
                    question: "Sample question 1 for " + lesson + "?",
                    options: ["Option A", "Option B", "Option C", "Option D"],
                    answer: "Option B"
                },
                {
                    question: "Sample question 2 for " + lesson + "?",
                    options: ["Option A", "Option B", "Option C", "Option D"],
                    answer: "Option D"
                },
                {
                    question: "Sample essay question for " + lesson + "?",
                    answer: "This is a sample answer that would be provided for an essay-type question."
                }
            ];
            displayQuestions(subject, unit, lesson, mockQuestions);
        } else {
            // Simulate error
            throw new Error('Questions not found');
        }
    } catch (error) {
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
            ${question.answer ? `<p><strong>Answer:</strong> ${question.answer}</p>` : ''}
        `;
        questionContent.appendChild(questionDiv);
    });

    modal.style.display = 'block';
}

function showError(subject, unit, lesson) {
    const modal = document.getElementById('questionModal');
    const modalTitle = document.getElementById('modalTitle');
    const questionContent = document.getElementById('questionContent');

    modalTitle.textContent = 'Error';
    questionContent.innerHTML = `
        <div class="error-message">
            Questions not found for ${subject} - ${unit} - ${lesson}
        </div>
    `;

    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('questionModal').style.display = 'none';
}