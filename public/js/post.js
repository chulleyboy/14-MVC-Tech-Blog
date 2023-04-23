const newPost = async (user_id) => {
	const user_id = form.dataset.userId;
	const title = document.querySelector('#post-title').value.trim();
	const content = document.querySelector('#post-content').value.trim();
	const response = await fetch('/post', {
	  method: 'POST',
	  body: JSON.stringify({ title, content, user_id }),
	  headers: { 'Content-Type': 'application/json' },
	});
  
	if (response.ok) {
	  document.location.replace('/');
	} else {
	  alert('Failed to post');
	}
  }
