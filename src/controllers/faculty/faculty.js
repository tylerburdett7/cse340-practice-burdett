import { getFacultyById, getSortedFaculty, facultyListMap } from '../../models/faculty/faculty.js';

console.log("✅ Faculty controller file loaded");

// Show list of all faculty
const facultyListPage = (req, res) => {
    try {
        const sortBy = req.query.sort || 'department'; // match EJS link param (?sort=)
        console.log('📘 Faculty controller: sortBy =', sortBy);

        // Get sorted faculty list
        const facultyList = getSortedFaculty(sortBy);
        console.log('📗 Retrieved faculty list with', facultyList.length, 'entries');

        // Add ID field to each faculty member for linking
        const facultyWithIds = facultyList.map(member => {
            // Find the matching key (id) from the faculty object
            const id = Object.keys(facultyListMap).find(key => facultyListMap[key].name === member.name);
            return { id, ...member };
        });

        // Render faculty list page
        res.render('faculty/list', {
            title: 'Faculty Directory',
            faculty: facultyWithIds,     // matches your EJS variable name
            currentSort: sortBy          // matches EJS "currentSort"
        });

    } catch (error) {
        console.error('❌ Error rendering faculty list:', error);
        res.status(500).send('Internal Server Error');
    }
};


// Show detail page for a single faculty member
const facultyDetailPage = (req, res) => {
    const facultyId = req.params.facultyId;
    console.log('📘 Faculty detail requested for:', facultyId);

    const facultyMember = getFacultyById(facultyId);

    if (!facultyMember) {
        console.warn('⚠️ Faculty not found:', facultyId);
        return res.status(404).render('404', { message: 'Faculty member not found' });
    }

    // Render the faculty detail page
    res.render('faculty/detail', {
        title: facultyMember.name,
        faculty: facultyMember // your EJS expects "faculty"
    });
};

export { facultyListPage, facultyDetailPage };
