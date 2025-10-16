import { getFacultyById, getSortedFaculty } from '../../models/faculty/faculty.js';

console.log("✅ Faculty controller file loaded");

// Show list of all faculty
const facultyListPage = (req, res) => {
    try {
        const sortBy = req.query.sortBy || 'department'; // define it first
        console.log('Faculty controller loaded, sortBy =', sortBy);

        const facultyList = getSortedFaculty(sortBy);
        console.log('Got facultyList:', facultyList);

        res.render('faculty/list', {
            title: 'Faculty Directory',
            facultyList,
            sortBy
        });
    } catch (error) {
        console.error('Error rendering faculty list:', error);
        res.status(500).send('Internal Server Error');
    }
};



// Show detail page for a single faculty member
const facultyDetailPage = (req, res) => {
    const facultyId = req.params.facultyId;
    const facultyMember = getFacultyById(facultyId);

    if (!facultyMember) {
        // Faculty not found
        res.status(404).render('404', { message: 'Faculty member not found' });
        return;
    }

    // Render the faculty detail page
    res.render('faculty/detail', {
        title: facultyMember.name,
        facultyMember
    });
};


export { facultyListPage, facultyDetailPage };
