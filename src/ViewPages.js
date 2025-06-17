function ViewPage() {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <div>
      <h2>Welcome {user?.email}</h2>
    </div>
  );
}

export default ViewPage;
