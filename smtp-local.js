const { SMTPServer } = require('smtp-server');

const server = new SMTPServer({
  authOptional: true,
  disabledCommands: ['STARTTLS'],
  onData(stream, session, callback) {
    console.log('\n=== رسالة جديدة ===');
    stream.pipe(process.stdout);
    stream.on('end', () => {
      console.log('\n=== نهاية الرسالة ===\n');
      callback();
    });
  }
});

server.listen(25, () => {
  console.log('SMTP محلي خدام على المنفذ 25');
});

server.on('error', (err) => {
  console.log('خطأ فـ SMTP:', err.message);
});