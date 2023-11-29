const BookList = ({ books }) => {
	return (
		<div>
			{books.map((obj) => (
				<div key={obj.key}>
					<p>{obj.title}</p>
				</div>
			))}
		</div>
	);
};

export default BookList;
