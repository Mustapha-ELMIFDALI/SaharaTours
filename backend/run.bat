@echo off
REM ─────────────────────────────────────────────────────────────────────────────
REM  Démarre le backend SaharaTours (Spring Boot)
REM  Pré-requis : MySQL démarré sur localhost:3306
REM  Base créée automatiquement : saharatours_db
REM ─────────────────────────────────────────────────────────────────────────────

set JAVA_HOME=C:\Users\DELL\.vscode\extensions\redhat.java-1.54.0-win32-x64\jre\21.0.10-win32-x86_64
set MVN="C:\Program Files\JetBrains\IntelliJ IDEA 2025.3.2\plugins\maven\lib\maven3\bin\mvn.cmd"

echo Starting SaharaTours Backend on port 8080...
%MVN% spring-boot:run
