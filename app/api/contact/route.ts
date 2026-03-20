import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'contacts.json');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Read existing data
    let contacts = [];
    if (fs.existsSync(DATA_FILE)) {
      const fileData = fs.readFileSync(DATA_FILE, 'utf8');
      contacts = JSON.parse(fileData);
    }
    
    // Add new contact
    const newContact = {
      ...body,
      id: Date.now(),
      date: new Date().toISOString(),
      status: 'New'
    };
    contacts.push(newContact);
    
    // Save back to file
    fs.writeFileSync(DATA_FILE, JSON.stringify(contacts, null, 2));
    
    return NextResponse.json({ message: 'Success' }, { status: 200 });
  } catch (error) {
    console.error('Error in contact API:', error);
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}
