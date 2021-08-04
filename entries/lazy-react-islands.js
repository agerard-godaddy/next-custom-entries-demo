function callback(entries) {
  console.log(entries)
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      import('./react-islands');
    }
  })
}

const observer = new IntersectionObserver(callback);
observer.observe(document.querySelector('example-btn'));
