<template>
  <div class="learn-more-container">
    <section class="introduction-section">
      <h1>Enhanced Security for Your Digital Life</h1>
      <p>
        Protecting your digital footprint with state-of-the-art encryption and
        privacy controls.
      </p>
    </section>

    <section class="security-features-section">
      <h2>Advanced Security at Your Fingertips</h2>
      <p>
        Our platform employs military-grade encryption algorithms and two-factor
        authentication to safeguard your data against unauthorized access.
      </p>
    </section>

    <section class="data-privacy-section">
      <h2>Data Privacy You Can Trust</h2>
      <p>
        We are committed to maintaining the integrity of your personal
        information with strict data protection policies and GDPR compliance.
      </p>
    </section>

    <section class="cloud-storage-section">
      <h2>Secure Cloud Storage Solutions</h2>
      <p>
        Our cloud infrastructure offers redundant backups and secure data
        storage solutions, ensuring your information is always available when
        you need it.
      </p>
    </section>

    <section class="user-control-section">
      <h2>Total Control in Your Hands</h2>
      <p>
        With user-centric privacy settings and transparent data management, you
        have full control over who can see and access your data.
      </p>
    </section>

    <section class="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div class="faq-list">
        <div class="faq-item">
          <h3>How do we protect your data?</h3>
          <p>
            We implement rigorous security protocols, including end-to-end
            encryption and continuous vulnerability assessments, to keep your
            data secure.
          </p>
        </div>
        <div class="faq-item">
          <h3>Can you access your data offline?</h3>
          <p>
            Our system allows for synchronized local storage, enabling secure
            access to your data even when you're offline.
          </p>
        </div>
        <!-- Add more FAQ items as needed -->
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'LearnMore',
};
</script>

<style scoped>
.learn-more-container {
  max-width: 800px;
  margin: auto;
  font-family: 'Arial', sans-serif;
  margin-bottom: 20px;
}
.introduction-section {
  margin-top: 130px;
}

.introduction-section,
.security-features-section,
.data-privacy-section,
.cloud-storage-section,
.user-control-section {
  text-align: center;
  padding: 2em;
  margin-bottom: 1em;
  background: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.introduction-section h1,
.security-features-section h2,
.data-privacy-section h2,
.cloud-storage-section h2,
.user-control-section h2 {
  color: #333;
  margin-bottom: 0.5em;
}

.faq-section {
  margin: 2em 0;
}

.faq-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1em;
}

.faq-item {
  background: #ffffff;
  border-left: 4px solid #007bff;
  padding: 1em;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.faq-item h3 {
  font-size: 1.25em;
  margin-bottom: 0.5em;
}

.faq-item p {
  font-size: 1em;
  line-height: 1.5;
}

h1,
h2 {
  font-weight: bold;
}
</style>
