#!/bin/bash

# V11 Nerdio Playbook Plus - Backup Script
# This script creates a timestamped backup of the entire project

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Create timestamp
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_NAME="v11-nerdio-backup-${TIMESTAMP}"
BACKUP_DIR="backups/${BACKUP_NAME}"

echo -e "${BLUE}Creating backup: ${BACKUP_NAME}${NC}"

# Create backup directory
mkdir -p "${BACKUP_DIR}"

# Create directories to backup
DIRS_TO_BACKUP=(
    "src"
    "public"
)

# Files to backup
FILES_TO_BACKUP=(
    "package.json"
    "package-lock.json"
    "tsconfig.json"
    "tsconfig.node.json"
    "vite.config.ts"
    "tailwind.config.js"
    "postcss.config.js"
    "index.html"
    ".gitignore"
    "README.md"
)

# Copy directories
for dir in "${DIRS_TO_BACKUP[@]}"; do
    if [ -d "$dir" ]; then
        echo "Backing up directory: $dir"
        cp -r "$dir" "${BACKUP_DIR}/"
    fi
done

# Copy files
for file in "${FILES_TO_BACKUP[@]}"; do
    if [ -f "$file" ]; then
        echo "Backing up file: $file"
        cp "$file" "${BACKUP_DIR}/"
    fi
done

# Create a restore script inside the backup
cat > "${BACKUP_DIR}/restore-backup.sh" << 'RESTORE_SCRIPT'
#!/bin/bash
# Restore script for V11 Nerdio Playbook Plus

echo "This will restore the backup to the parent directory."
echo "Make sure you're in the backup directory when running this."
read -p "Continue? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    cp -r ./* ../../
    echo "Backup restored successfully!"
else
    echo "Restore cancelled."
fi
RESTORE_SCRIPT

chmod +x "${BACKUP_DIR}/restore-backup.sh"

# Create archive
echo -e "${BLUE}Creating compressed archive...${NC}"
cd backups
tar -czf "${BACKUP_NAME}.tar.gz" "${BACKUP_NAME}"
cd ..

# Create backup info file
cat > "${BACKUP_DIR}/backup-info.txt" << INFO_END
V11 Nerdio Playbook Plus Backup
Created: $(date)
Node Version: $(node --version)
NPM Version: $(npm --version)

File Count:
- TypeScript files: $(find src -name "*.ts" -o -name "*.tsx" | wc -l)
- Total files: $(find "${BACKUP_DIR}" -type f | wc -l)

Key Features Included:
- TCO Analysis Calculator
- 12 Navigation Sections
- Interview Playbooks
- Financial Modeling
- Objection Handling
- Case Studies
- Quick Reference Guides
INFO_END

echo -e "${GREEN}✓ Backup created successfully!${NC}"
echo -e "Location: ${BACKUP_DIR}"
echo -e "Archive: backups/${BACKUP_NAME}.tar.gz"
