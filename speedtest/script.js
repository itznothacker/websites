document.addEventListener('DOMContentLoaded', () => {
    const testButton = document.getElementById('test-button');
    const loadingSpinner = document.getElementById('loading-spinner');
    const result = document.getElementById('result');
    const speedNumber = document.getElementById('speed-number');
    const buttonText = testButton.querySelector('span');

    async function checkSpeed() {
        // Reset UI
        testButton.disabled = true;
        result.classList.add('hidden');
        loadingSpinner.classList.remove('hidden');
        buttonText.textContent = 'Testing...';

        const imageLink = 'https://images.unsplash.com/photo-1545156521-77bd85671d30?w=2400';
        const downloadSize = 5242880; // 5MB test file
        
        const startTime = new Date().getTime();
        const downloadSrc = new Image();
        
        downloadSrc.onload = () => {
            const endTime = new Date().getTime();
            const duration = (endTime - startTime) / 1000;
            const bitsLoaded = downloadSize * 8;
            const speedMbps = (bitsLoaded / duration / 1024 / 1024).toFixed(2);
            const speedMBps = (parseFloat(speedMbps) / 8).toFixed(2);
            
            // Update UI with results
            loadingSpinner.classList.add('hidden');
            result.classList.remove('hidden');
            speedNumber.textContent = speedMBps;
            
            // Reset button
            testButton.disabled = false;
            buttonText.textContent = 'Test Again';
        };

        downloadSrc.onerror = () => {
            // Handle error
            loadingSpinner.classList.add('hidden');
            testButton.disabled = false;
            buttonText.textContent = 'Try Again';
            alert('Error testing speed. Please try again.');
        };

        // Start download
        downloadSrc.src = `${imageLink}?cache=${startTime}`;
    }

    testButton.addEventListener('click', checkSpeed);
});