import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { auth } from '@/auth';

const DATA_FILE = path.join(process.cwd(), 'data', 'contacts.json');

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    if (fs.existsSync(DATA_FILE)) {
      const fileData = fs.readFileSync(DATA_FILE, 'utf8');
      return NextResponse.json(JSON.parse(fileData), { status: 200 });
    }
    return NextResponse.json([], { status: 200 });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await request.json();
    if (fs.existsSync(DATA_FILE)) {
      const fileData = fs.readFileSync(DATA_FILE, 'utf8');
      let contacts = JSON.parse(fileData);
      contacts = contacts.filter((c: any) => c.id !== id);
      fs.writeFileSync(DATA_FILE, JSON.stringify(contacts, null, 2));
      return NextResponse.json({ message: 'Deleted' }, { status: 200 });
    }
    return NextResponse.json({ message: 'Not found' }, { status: 404 });
  } catch (error) {
    console.error('Error deleting contact:', error);
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}
