const http = require('http');

async function test(name, options, postData) {
  return new Promise((resolve) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log(`\n========================================`);
        console.log(`[${name}]`);
        console.log(`Status Code: ${res.statusCode} ${res.statusMessage}`);
        try {
          const parsed = JSON.parse(data);
          console.log(`Response Preview:`, JSON.stringify(parsed, null, 2).slice(0, 300) + '...');
        } catch (e) {
          console.log(`Response: HTML / Text content (${data.length} bytes)`);
        }
        resolve();
      });
    });
    req.on('error', (e) => {
      console.log(`\n========================================`);
      console.log(`[${name}] Connection Error:`, e.message);
      resolve();
    });
    if (postData) req.write(postData);
    req.end();
  });
}

async function run() {
  console.log('>>> TESTING ALL 9 TEST CASES FOR FIGURE 5.4 <<<');

  // Test 1: Open dashboard
  await test('Test 1: Open dashboard', {
    hostname: 'localhost', port: 5000, path: '/api/stats/overview', method: 'GET'
  });

  // Test 2: Submit valid student details
  const studentPayload = JSON.stringify({
    name: 'Ananya Sharma',
    email: 'ananya.s@hostel.edu',
    password: 'student123',
    role: 'student',
    rollNo: 'CS23B110',
    block: 'Block B',
    floor: 'Floor 2',
    roomNo: '215',
    phone: '+91 98765 43219'
  });
  await test('Test 2: Submit valid student details', {
    hostname: 'localhost', port: 5000, path: '/api/auth/register', method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(studentPayload) }
  }, studentPayload);

  // Test 3: View room details
  await test('Test 3: View room details (Room 204)', {
    hostname: 'localhost', port: 5000, path: '/api/rooms/204', method: 'GET'
  });

  // Test 4: Submit a complaint
  const complaintPayload = JSON.stringify({
    studentId: 'usr-std-1',
    studentName: 'Rahul Sharma',
    roomNo: '204',
    block: 'Block A',
    category: 'Electrical',
    title: 'Study Lamp Socket Not Working',
    description: 'The wall socket near study desk 2 is loose and sparks when plugging in charger.',
    priority: 'High'
  });
  await test('Test 4: Submit a complaint', {
    hostname: 'localhost', port: 5000, path: '/api/complaints', method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(complaintPayload) }
  }, complaintPayload);

  // Test 5: Submit a facility booking
  const bookingPayload = JSON.stringify({
    studentId: 'usr-std-1',
    studentName: 'Rahul Sharma',
    roomNo: '204',
    facility: 'Badminton Court',
    date: '2026-10-22',
    timeSlot: '17:00 - 18:30',
    purpose: 'Evening Sports Training'
  });
  await test('Test 5: Submit a facility booking', {
    hostname: 'localhost', port: 5000, path: '/api/facility-bookings', method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(bookingPayload) }
  }, bookingPayload);

  // Test 6: Open electricity chart
  await test('Test 6: Open electricity chart', {
    hostname: 'localhost', port: 5000, path: '/api/analytics/electricity', method: 'GET'
  });

  // Test 7: Open water chart
  await test('Test 7: Open water chart', {
    hostname: 'localhost', port: 5000, path: '/api/analytics/water', method: 'GET'
  });

  // Test 8: Submit incomplete input
  const incompletePayload = JSON.stringify({ studentId: 'usr-std-1' });
  await test('Test 8: Submit incomplete input (Validation check)', {
    hostname: 'localhost', port: 5000, path: '/api/complaints', method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(incompletePayload) }
  }, incompletePayload);

  // Test 9: Test unavailable API/database
  await test('Test 9a: Database resilience / Simulated outage check', {
    hostname: 'localhost', port: 5000, path: '/api/simulate-db-error', method: 'GET'
  });

  await test('Test 9b: Unavailable API route handling', {
    hostname: 'localhost', port: 5000, path: '/api/unavailable-service', method: 'GET'
  });
}

run();
