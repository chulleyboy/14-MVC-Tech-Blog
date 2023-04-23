const newPost = async (user_id, user_username) => {
	const title = document.querySelector('#post-title').value.trim();
	const content = document.querySelector('#post-content').value.trim();
	const response = await fetch('/post', {
	  method: 'POST',
	  body: JSON.stringify({ title, content, user_id, user_username }),
	  headers: { 'Content-Type': 'application/json' },
	});
  
	if (response.ok) {
	  document.location.replace('/');
	} else {
	  alert('Failed to post');
	}
  }
